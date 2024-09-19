import { ref } from 'vue';
import axios from 'axios';
import { useUsers } from '@/composables/useUsers';

export function useUserConnect() {
    const API = "http://localhost:3000/user";
    const { setLoggedInUser } = useUsers();
    const error = ref("");

    async function login(email, password) {
        try {
          const res = await axios.get(API, {
            params: { email }
          });
          console.log('dt :', res.data);
          
          const normalizedEmail = email.trim().toLowerCase();
          const user = res.data.find(user => user.email_user.toLowerCase() === normalizedEmail);
    
          if (!user) {
            throw new Error("EMAIL_NOT_FOUND");
          }
    
          if (user.mdp_user !== password) {
            throw new Error("PASSWORD_INCORRECT");
          }
    
          setLoggedInUser(user);

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

      return { login, error };
}