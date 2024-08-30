import axios from "axios";
import { useValidator } from "./useValidator";

export function useUpdateUser() {
    const API = 'http://localhost:3000/users/';
    const { isValidEmail, isValidPassword } = useValidator();

    async function update(id, user) {
        
        if (user.email && !isValidEmail(user.email)) {
            throw new Error('L\'email fourni est invalide.');
        }
    
        if (user.password && !isValidPassword(user.password)) {
            throw new Error('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un caractère spécial.');
        }

        try {
            const res = await axios.get(API);
            const existingUser = res.data.find(u => u.email === user.email && u.id !== id);

            if (existingUser) {
                throw new Error('Cet email est déjà utilisé par un autre utilisateur.');
            }

            const updateRes = await axios.put(API + id, user);
            return updateRes.data;
            
        } catch (e) {
            console.error(e);
            throw new Error(e.response?.data?.message || 'Erreur lors de la mise à jour de l\'utilisateur.');
        }
    }
    return {update}
}