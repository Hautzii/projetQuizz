<script setup>
import { ref } from "vue";
import { useUsers } from "@/composables/useUsers";
import { useUpdateUser } from "@/composables/useUpdateUsers";
import { useDeleteUser } from "@/composables/useDeleteUsers.js";

const { users,loggedInUser,load } = useUsers(); 
const { update } = useUpdateUser();
const { remove } = useDeleteUser();

const selectedUser = ref(null);
const updatedUsername = ref("");
const updatedEmail = ref("");
const updatedPassword = ref("");
const showPassword = ref(false);
const errorMessage = ref("");
const successMessage = ref("");


function editUser(user) {
  selectedUser.value = user;
  updatedUsername.value = user.username;
  updatedEmail.value = user.email;
  updatedPassword.value = user.password;
}
function deletedUser(id) {
  remove(id);
  load();
}

async function saveUser() {
  const updatedUser = {
    username: updatedUsername.value,
    email: updatedEmail.value,
    password: updatedPassword.value,
  };

  if (selectedUser.value) {
    try {
      await update(selectedUser.value.id, updatedUser);
      successMessage.value = "Utilisateur modifié avec succès";
      errorMessage.value = "";
      selectedUser.value = null;
      loggedInUser.value = { ...loggedInUser.value, ...updatedUser };
      
      // alert("Utilisateur mis à jour avec succès");
      load();

    } catch (e) {
      console.error("Erreur lors de la mise à jour :", e);
      errorMessage.value = e.message;
      successMessage.value = "";
    }
  }
}

</script>

<template>
  <div>
    <h2>Mon Profil</h2>
    <ul v-if="users">
      <li v-for="u in users" :key="u.id">
        <p>{{ u.username }}</p>
        <p>{{ u.email }}</p>
        <p>{{ u.password }}</p>
        <button @click="editUser(u)">Modifier</button>
        <button @click="deletedUser(u.id)">Supprimer</button>
      </li>
    </ul>
    
    <div v-if="loggedInUser">
      <p>Nom d'utilisateur : {{ loggedInUser.username }}</p>
      <p>Email : {{ loggedInUser.email }}</p>
      <button @click="editUser(loggedInUser)">Modifier</button>
    </div>

    <div v-if="selectedUser">
      <h3>Modifier l'utilisateur</h3>
      <form @submit.prevent="saveUser">
        <div>
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="updatedEmail" />
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="updatedPassword"
          />
        </div>
        <div>
          <input type="checkbox" id="show-password" v-model="showPassword" />
          <label for="show-password">Afficher le mot de passe</label>
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: #ff6060;
}
.success {
  color: #00c500;
}
</style>
