<script setup>
import { ref } from "vue";
import { useUsers } from "@/composables/useUsers";
import { useRouter } from 'vue-router';

const { users, login, error } = useUsers();
const router = useRouter();

const email = ref("");
const password = ref("");

async function handleSubmit() {
  try {
    await login(email.value, password.value);
    router.push('/utilisateur'); 
  } catch (e) {
      console.log(e);
      
    }
  }

</script>

<template>
  <div class="auth-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email : </label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Mot de passe : </label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Se connecter</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p>
        Pas encore de compte ?
        <router-link to="/inscription">S'inscrire</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
form div {
  margin-bottom: 15px;
}
.error {
  color: red;
}
</style>
