import axios from "axios";

export function useDeleteUser() {
    const API = 'http://localhost:3000/users';

    async function remove(id) {
        try {
            const res = await axios.delete(`${API}/${id}`);
            console.log("Réponse de la suppression :", response);
          successMessage.value = "Utilisateur supprimé avec succès";
          errorMessage.value = "";
          const index = users.value.findIndex(user => user.id === id);
          if (index !== -1) {
            users.value.splice(index, 1);
          }
          
          await load();
         
            return res.data;
        } catch (e) {
            console.error("Erreur lors de la suppression :", e);
            errorMessage.value = e.message;
            successMessage.value = "";
        }
    }

    return {remove}
}
