<script setup>
import { ref } from "vue";
import { useUsers } from "@/composables/useUsers";
import { useUpdateUser } from "@/composables/useUpdateUsers";

const { users, load } = useUsers();
const { update } = useUpdateUser();

const selectedUser = ref(null);
const updatedUsername = ref("");
const updatedEmail = ref("");
const updatedPassword = ref("");
const showPassword = ref(false);

function editUser(user) {
  selectedUser.value = user;
  updatedUsername.value = user.username;
  updatedEmail.value = user.email;
  updatedPassword.value = user.password;
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
      alert("Utilisateur mis à jour avec succès");
      selectedUser.value = null;
      load();
    } catch (e) {
      console.error("Erreur lors de la mise à jour :", e);
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
      </li>
    </ul>

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
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
