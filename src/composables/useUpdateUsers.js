import axios from "axios";

export function useUpdateUser() {
    const API = 'http://localhost:3000/users/';

    async function update(id, user) {
        
        if (!isValidEmail(user.email)) {
            throw new Error('L\'email fourni est invalide.');
        }

        if (!isValidPassword(user.password)) {
            throw new Error('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un caractère spécial.');
        }

        try {
            const res = await axios.put(API + id, user);
            return res.data;
        } catch (e) {
            console.log(e)
        }
    }
    return {update}
}