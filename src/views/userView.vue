<script setup>
import { ref } from "vue";
import { useUsers } from "@/composables/useUsers";
import { useUpdateUser } from "@/composables/useUpdateUsers";
import { useDeleteUser } from "@/composables/useDeleteUsers.js";

const { users, loggedInUser,load} = useUsers();
const { update } = useUpdateUser();
const { remove } = useDeleteUser();

const selectedUser = ref(null);
const editingField = ref("");

const updatedEmail = ref("");
const updatedPassword = ref("");

const showPassword = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

function editUser(user, field) {
  selectedUser.value = user;
  editingField.value = field;

  if (field === "email") {
    updatedEmail.value = user.email;
  } else if (field === "password") {
    updatedPassword.value = user.password;
  }
}

async function deletedUser(id) {
  try {
    const response = await remove(id);
    console.log("Réponse de la suppression :", response);
    successMessage.value = "Utilisateur supprimé avec succès";
    errorMessage.value = "";
   
    
    const index = users.value.findIndex(user => user.id === id);
    if (index !== -1) {
      users.value.splice(index, 1);
    }
    
    await load();
  } catch (e) {
    console.error("Erreur lors de la suppression :", e);
    errorMessage.value = e.message;
    successMessage.value = "";
  }
}

async function saveUser() {
  if (!selectedUser.value) return;

  const updatedUser = { ...selectedUser.value };

  if (editingField.value === "email" && updatedEmail.value) {
    updatedUser.email = updatedEmail.value;
  }

  if (editingField.value === "password" && updatedPassword.value) {
    updatedUser.password = updatedPassword.value;
  }
  if (selectedUser.value) {
    try {

      await update(selectedUser.value.id, updatedUser);
      selectedUser.value = null;
      editingField.value = "";

      updatedEmail.value = "";
      updatedPassword.value = "";
      alert('Utilisateur modifié avec succès')
      // successMessage.value = "Utilisateur modifié avec succès";
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
    <div v-for="u in users" :key="u.id">
      <p>Nom d'utilisateur : {{ u.username }}</p>
      <p>
        Email : {{ u.email }}
        <button @click="editUser(u, 'email')">Modifier</button>
      </p>
      <p>
        Mot de passe : ********
        <button @click="editUser(u, 'password')">Modifier</button>
      </p>
      <button @click="deletedUser(u.id)">Supprimer</button>
    </div>

    <div v-if="selectedUser">
      <h3>
        Modifier {{ editingField === "email" ? "l'email" : "le mot de passe" }}
      </h3>
      <form @submit.prevent="saveUser">
        <div v-if="editingField === 'email'">
          <label for="email"> Email : </label>
          <input
            type="email"
            id="email"
            v-model="updatedEmail"
            placeholder="Entrez un nouvel email"
          />
        </div>
        <div v-if="editingField === 'password'">
          <label for="password">Mot de passe :</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="updatedPassword"
            placeholder="Entrez un nouveau mot de passe"
          />
          <div>
            <input type="checkbox" id="show-password" v-model="showPassword" />
            <label for="show-password">Afficher le mot de passe</label>
          </div>
        </div>
        <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p> -->
        <button type="submit">Enregistrer les modifications</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
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
