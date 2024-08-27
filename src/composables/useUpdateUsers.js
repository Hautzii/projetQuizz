import axios from "axios";

export function useUpdateUser() {
    const API = 'http://localhost:3001/users';

    async function update(id, user) {
        try {
            const res = await axios.put(API + id, user);
            return res.data;
        } catch (e) {
            console.log(e)
        }
    }
    return {update}
}