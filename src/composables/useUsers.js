import { ref } from "vue";
import axios from "axios";

export function useUsers() {
  const API = "http://localhost:3000/user";
  const loggedInUser = ref(null);
  const error = ref("");
  const isLoading = ref(true);

  async function load(userId) {
    try {
      isLoading.value = true;

      if (!userId) {
        isLoading.value = false;
        return;
      }
      const res = await axios.get(`${API}/${userId}`);

      loggedInUser.value = res.data;
    } catch (e) {
      console.error('Erreur lors du chargement:', e);
      error.value = e.message;
    }finally {
      isLoading.value = false;
    }
  }

  return { 
    loggedInUser,
    load, 
    error, 
    isLoading
  };
}
