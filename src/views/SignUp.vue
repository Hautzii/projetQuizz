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
        <input class="check" type="checkbox" id="show-password" v-model="showPassword" />
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
  background-color: #1E1E1E;
}
form div {
  margin-bottom: 15px;
}
.error {
  color: #ff6060;
}
.success {
  color: #00c500; 
}
input {
  border: none;
  background-color: transparent;
  color: #ffecd5;
  padding: 5px 0;
  width: 200px;
  border-bottom: 3px solid #ffecd5;
}
.check{
  width: 20px;
}
h2 {
  color: #ffecd5;
}
p{
  color: #ffecd5;
}
label{
  color: #ffecd5;
}
a{
  list-style: none;
  color: #ff6060;
}
button{
  color: #FFECD5;
  font-size: 14px;
  padding: 10px 25px;
  border-radius: 10px;
  border: 2px solid #FFECD5;
  background: #1E1E1E;
  background: linear-gradient(to top, #1E1E1E, #1E1E1E);
}
button:hover{
  color: #1e1e1e ;
  background: #FFECD5;
  background: linear-gradient(to top, #FFECD5, #FFECD5);
}
</style>
