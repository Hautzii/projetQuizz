<script setup>
import { ref } from "vue";
import { useCreateUser } from "@/composables/useCreateUsers";
import { useRouter } from "vue-router";

const { create } = useCreateUser();
const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

async function handleCreate() {
  const user = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  try {
    await create(user);
    successMessage.value = "Utilisateur créé avec succès";
    errorMessage.value = "";

    username.value = "";
    email.value = "";
    password.value = "";
    
    // router.push("/connexion");
    //setTimeout(() => router.push('/connexion'), 2000);
  } catch (e) {
      errorMessage.value = e.message;
      successMessage.value = "";
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
        <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" required />
      </div>
      <div>
        <input type="checkbox" id="show-password" v-model="showPassword" />
        <label for="show-password">Afficher le mot de passe</label>
      </div>
      <button type="submit">S'inscrire</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p>
        Déjà un compte ? <router-link to="/connexion">Se connecter</router-link>
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
.success {
  color: green; 
}
</style>
