<script setup>
import { ref } from "vue";
import { useCreateUser } from "@/composables/useCreateUsers";
import { useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";

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
        } catch (e) {
            errorMessage.value = e.message;
            successMessage.value = "";
          }
    }

</script>

<template>
  <div class="main-container content-container">
    <NavBar />
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
        <div class="checkbox-container">
          <input class="check" type="checkbox" id="show-password" v-model="showPassword" />
          <label for="show-password">Afficher le mot de passe</label>
        </div>
        <button type="submit" class="submit-button">S'inscrire</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p class="login">
          Déjà un compte ? <router-link to="/connexion">Se connecter</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  --primary-color: #41b883;
  --primary-hover-color: #329066;
  --background-color: #f0f0f0;
  --text-color: #333;
  --border-color: #ccc;
  --border-radius: 0.5rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  max-width: 750px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
}

.content-container {
  padding-top: 80px;
}

.auth-container {
  background-color: var(--text-color);
  padding: 2rem 1.5rem;
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 400px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form div {
  margin-bottom: 15px;
  width: 100%;
}

input {
  width: 100%;
  border: none;
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 0.5rem;
  border-radius: var(--border-radius);
  margin-top: 0.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.check {
  width: auto;
  margin-right: 0.5rem;
}

h2 {
  color: var(--background-color);
  margin-bottom: 1rem;
}

p, label {
  color: var(--background-color);
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

.submit-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: 0.3s ease-in-out;
  margin-top: 1rem;
  width: 100%;
}

.submit-button:hover {
  background-color: var(--primary-hover-color);
}

.login {
  margin-top: 1rem;
}

.error {
  color: #ff6060;
  margin-top: 1rem;
}

.success {
  color: #00c500;
  margin-top: 1rem;
}

@media screen and (max-width: 767px) {
  .auth-container {
    width: 90%;
  }
}
</style>
