import axios from "axios";
import { useValidator } from "./useValidator";

export function useCreateUser() {
    const API = 'http://localhost:3000/user';
    const APIcreate = 'http://localhost:3000/user/create';
    const { isValidEmail, isValidPassword } = useValidator();

    async function create(user) {

        if (!isValidEmail(user.email)) {
            throw new Error('L\'email fourni est invalide.');
        }

        if (!isValidPassword(user.password)) {
            throw new Error('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un caractère spécial.');
        }

        try {
            const res = await axios.get(API); 
            const existingUser = res.data.find(u => u.email_user === user.email || u.name_user === user.username);

            if (existingUser) {
                if (existingUser.email_user === user.email) {
                    throw new Error('EMAIL_ALREADY_EXISTS');
                }
                if (existingUser.name_user === user.username) {
                    throw new Error('USERNAME_ALREADY_EXISTS');
                }
            }

            const createRes = await axios.post(APIcreate, user); 
            return createRes.data;

        } catch (e) {
            if (e.message === 'EMAIL_ALREADY_EXISTS'){
                throw new Error('Cet email est déjà utilisé.');

            } else if (e.message === 'USERNAME_ALREADY_EXISTS') {
                throw new Error('Ce nom d\'utilisateur est déjà pris.');

            } else {
                console.error(e);
                throw new Error(e.response?.data?.message || 'Erreur lors de la création de l\'utilisateur.');
            }
        }
    }

    return { create };
}
