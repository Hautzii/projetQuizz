import { ref } from "vue";
import axios from "axios";

export function useUsers() {
  const API = "http://localhost:3000/user";

  const loggedInUser = ref(null);
  const error = ref("");
  

  async function load() {
    try {
      if (!loggedInUser.value || !loggedInUser.value.id) return;

      console.log('Chargement des infos de l\'utilisateur:', loggedInUser.value);

      const res = await axios.get(`${API}/${loggedInUser.value.id}`);
      loggedInUser.value = res.data;
    } catch (e) {
      console.log(e);
      error.value = e.message;
    }
  }

  function setLoggedInUser(user) {
    loggedInUser.value = user;
    console.log('Utilisateur défini dans setLoggedInUser:', loggedInUser.value);
    load();
  }

  return { 
    load,
    loggedInUser, 
    setLoggedInUser, 
    error, 
  };
}
