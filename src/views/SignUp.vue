<script setup>
import { ref } from 'vue';
import { useCreateUser } from "@/composables/useCreateUsers";
import { useRouter } from 'vue-router';

const { create } = useCreateUser();
const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref(false);

async function handleCreate() {
  try {
    const user = { username: username.value, email: email.value, password: password.value };
    await create(user);
    alert('Votre Inscription est OK')
    router.push('/');
  } catch (e) {
    errorMessage.value = e.message || "Une erreur est survenue lors de la création de votre compte.";
  }
}
</script>

<template>
  <div class="auth-container">
    <h2>Inscription</h2>
    <form @submit.prevent="handleCreate">
      <div>
        <label for="username">Nom d'utilisateur : </label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="email">Email : </label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Mot de passe : </label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">S'inscrire</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p>
        Déjà un compte ? <router-link to="/">Se connecter</router-link>
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
