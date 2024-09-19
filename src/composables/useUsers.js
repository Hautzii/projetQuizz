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
        console.log("ID de l'utilisateur non fourni.");
        isLoading.value = false;
        return;
      }

      console.log('Chargement des infos de l\'utilisateur:', userId);

      const res = await axios.get(`${API}/${userId}`);
      console.log('Réponse de l\'API lors du chargement:', res.data);

      loggedInUser.value = res.data;
      console.log('Utilisateur après mise à jour:', loggedInUser.value);
    
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
