import axios from "axios";

export function useDeleteUser() {
    const API = 'http://localhost:3000/users';

    async function remove(id) {
        try {
            const res = await axios.delete(`${API}/${id}`);
            return res.data;
        } catch (e) {
            console.error(e)
        }
    }

    return {remove}

}
