import axios from "axios";

export function useCreateUser() {
    const API = 'http://localhost:3001/users';

    async function create(user) {
        try {
            const res = await axios.post(API, user); 
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error(e.response?.data?.message || 'Erreur lors de la création de l\'utilisateur.');
        }
    }

    return { create };
}
