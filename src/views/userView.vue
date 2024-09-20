<script setup>
import { ref,onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useUsers } from "@/composables/useUsers";
import { useUpdateUser } from "@/composables/useUpdateUsers";

const userStore = useUserStore(); 
const { loggedInUser, isLoading,load, error} = useUsers();
const { editUser, saveUser,selectedUser,editingField,updatedEmail,updatedPassword,errorMessage, successMessage }= useUpdateUser(load);

const showPassword = ref(false);

onMounted(() => {
  if (!loggedInUser.value && userStore.userId) {
    load(userStore.userId);  
  }
});


</script>

<template>
  <div v-if="isLoading">
    <p>Chargement des informations de l'utilisateur...</p>
  </div>
  <div v-else-if="error">
    <p class="error">Erreur: {{ error }}</p>
  </div>
  <div v-else>
    <h2>Mon Profil</h2>
    <div v-if="loggedInUser">
      <p>Nom d'utilisateur : {{ loggedInUser.name_user }}</p>
      <p>
        Email : {{ loggedInUser.email_user }}
        <button v-if="loggedInUser" @click="editUser(loggedInUser, 'email')">Modifier</button> 
      </p>
      <p>
        Mot de passe : ******** 
        <button @click="editUser(loggedInUser, 'password')">Modifier</button>
      </p>
      <button  @click="remove(loggedInUser.id)">Supprimer</button>
    </div>
    <div v-else>
      <p>Aucune information utilisateur disponible.</p>
    </div>
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
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <button type="submit">Enregistrer les modifications</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
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
