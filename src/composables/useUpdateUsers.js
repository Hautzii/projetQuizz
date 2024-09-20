import axios from "axios";
import {ref} from "vue";
import { useValidator } from "./useValidator";

export function useUpdateUser() {
    const API = 'http://localhost:3000/user/use';
    const APIUpdate = 'http://localhost:3000/user/update/';
    const { isValidEmail, isValidPassword } = useValidator();

    const selectedUser = ref(null);
  const editingField = ref("");
  const updatedEmail = ref("");
  const updatedPassword = ref("");
  const errorMessage = ref("");
  const successMessage = ref("");

  function editUser(user, field) {
    console.log('editUser appelé avec', user, field); // Pour vérifier si la fonction est appelée
  if (!user) {
    console.error("L'utilisateur est indéfini.");
    return;
  }

    selectedUser.value = user;
    editingField.value = field;

    if (field === "email") {
      updatedEmail.value = user.email_user;
    } else if (field === "password") {
      updatedPassword.value = ""; // Ne jamais pré-remplir le mot de passe
    }
  }

  async function saveUser() {
    console.log('saveUser appelé');
    if (!selectedUser.value) return;

    const updatedUser = { ...selectedUser.value };

    if (editingField.value === "email" && updatedEmail.value) {
      updatedUser.email_user = updatedEmail.value;
    }else {
      updatedUser.email_user = undefined; 
    }

    if (editingField.value === "password" && updatedPassword.value) {
      updatedUser.mdp_user = updatedPassword.value;
    }else {
      updatedUser.mdp_user = undefined;
    }

    try {
      await update(selectedUser.value.id, updatedUser);
      selectedUser.value = null;
      editingField.value = "";

      updatedEmail.value = "";
      updatedPassword.value = "";
      successMessage.value = "Utilisateur modifié avec succès";

      load(updatedUser.id); 
    } catch (e) {
      console.error("Erreur lors de la mise à jour :", e);
      errorMessage.value = e.message;
      successMessage.value = "";
    }
  }

    async function update(id, user) {
        
        if (user.email && !isValidEmail(user.email)) {
            throw new Error('L\'email fourni est invalide.');
        }
    
        if (user.password && !isValidPassword(user.password)) {
            throw new Error('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un caractère spécial.');
        }

        try {
            const res = await axios.get(API);
            console.log(res.data);
            
            const existingUser = res.data.find(u => u.email_user === user.email_user && u.ID !== id);

            if (existingUser) {
                throw new Error('Cet email est déjà utilisé par un autre utilisateur.');
            }

            const updateRes = await axios.put(APIUpdate + id);
            return updateRes.data;
            
        } catch (e) {
            console.error(e);
            throw new Error(e.response?.data?.message || 'Erreur lors de la mise à jour de l\'utilisateur.');
        }
    }

    return {editUser,saveUser,update,selectedUser,editingField,updatedEmail,updatedPassword,errorMessage,successMessage}
}
