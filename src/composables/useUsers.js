import { onMounted, ref } from "vue";
import axios from "axios";

export function useUsers() {
  const API = "http://localhost:3000/users";
  const users = ref(null);
  const error = ref("");
  
  async function load() {
    try {
      const res = await axios.get(API);
      users.value = res.data;
    } catch (e) {
      console.log(e);
      error.value = e.message;
    }
  }

  async function login(email, password) {
    try {
      const res = await axios.get(API);
      const user = res.data.find(user => user.email === email);

      if (!user) {
        throw new Error("EMAIL_NOT_FOUND");
      }

      if (user.password !== password) {
        throw new Error("PASSWORD_INCORRECT");
      }
      return user;

    } catch (e) {
      if (e.message === "EMAIL_NOT_FOUND") {
        error.value = "Email incorrect";
        throw new Error("Email incorrect");
      } else if (e.message === "PASSWORD_INCORRECT") {
        error.value = "Mot de passe incorrect";
        throw new Error("Mot de passe incorrect");
      } else {
        error.value = e.response ? e.response.data.message : e.message;
        throw e;
      }
    }
  }

  onMounted(() => {
    load();
  });

  return { users, error, load, login };
}
