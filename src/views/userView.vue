<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useUsers } from "@/composables/useUsers";

const userStore = useUserStore(); 
const { loggedInUser, isLoading,load, error} = useUsers();

onMounted(() => {
  if (!loggedInUser.value && userStore.userId) {
    console.log("Chargement des informations utilisateur...");
    load(userStore.userId);  // Appel pour charger les infos de l'utilisateur
  }
});

console.log('loggedInUser (avant changement):', loggedInUser.value);
console.log('isLoading (avant changement):', isLoading.value);
console.log('error (avant changement):', error.value);

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
        Email : {{ loggedInUser.email_user }} <button>Modifier</button> 
      </p>
      <p>
        Mot de passe : ******** <button>Modifier</button>
      </p>
      <button>Supprimer</button>
    </div>
    <div v-else>
      <p>Aucune information utilisateur disponible.</p>
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
