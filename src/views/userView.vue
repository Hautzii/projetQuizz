<script setup>
import { ref, onMounted,watch} from "vue";
import { useUsers } from "@/composables/useUsers";

const { loggedInUser, load} = useUsers();

onMounted(() => {
  load(); 
  console.log('Utilisateur dans userView.vue :', loggedInUser.value);
});

watch(loggedInUser, (newValue) => {
  console.log('Changement dans loggedInUser:', newValue); // Surveillez les changements
});

const showPassword = ref(false);
const errorMessage = ref("");
const successMessage = ref("");


</script>

<template>
  <div v-if="loggedInUser && loggedInUser.name_user">
    <h2>Mon Profil</h2>
    <div>
      <p>Nom d'utilisateur : {{ loggedInUser.name_user }}</p>
      <p>
        Email : {{ loggedInUser.email_user }} <button>Modifier</button> 
      </p>
      <p>
        Mot de passe : ******** <button>Modifier</button>
      </p>
      <button>Supprimer</button>
    </div>
  </div>
    <div v-else>
    <p>Chargement des informations de l'utilisateur...</p>
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
