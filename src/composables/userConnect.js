import { ref } from 'vue';
import axios from 'axios';
import { useUsers } from '@/composables/useUsers';

export function useUserConnect() {
    const API = "http://localhost:3000/user";
    const error = ref("");

    async function login(email, password) {

        try {
          const normalizedEmail = email.trim().toLowerCase();
            console.log('Email normalisé:', normalizedEmail);

          const res = await axios.get(API, {
            params: { email: normalizedEmail  }
          });
          console.log('Réponse de l\'API:', res.data);
          
          const user = res.data;
          console.log('Utilisateur trouvé:', user);
    
          if (!user) {
            throw new Error("EMAIL_NOT_FOUND");
          }

        if (user.email_user.toLowerCase() !== normalizedEmail) {
            throw new Error("EMAIL_NOT_FOUND");
        }
    
          if (user.mdp_user !== password) {
            throw new Error("PASSWORD_INCORRECT");
          }

          return user ;

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

      return { login, error };
}
