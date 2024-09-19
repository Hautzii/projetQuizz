<script setup>
import { ref } from "vue";
import { useUserConnect } from "@/composables/userConnect";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const {login, error } = useUserConnect();
const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

async function handleSubmit() {
  try {
    const user = await login(email.value, password.value);
    console.log('Utilisateur connecté :',user);

    userStore.setUserId(user.ID);
    userStore.setLoggedInUser(user);

    router.push("/utilisateur");  
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
        <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" required />
      </div>
      <div>
        <input class="check" type="checkbox" id="show-password" v-model="showPassword" />
        <label for="show-password">Afficher le mot de passe</label>
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
  background-color: #1E1E1E;
}
form div {
  margin-bottom: 15px;
}
.error {
  color: #ff6060;
}
input {
  width: 200px;
  border: none;
  background-color: transparent;
  color: #ffecd5;
  padding: 5px 0;
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
