import { onMounted, ref } from "vue";
import axios from "axios";

export function useUsers() {
  const API = 'http://localhost:3001/users';
  const users = ref(null);
  const error = ref('');

  async function load() {
    try {
      const res = await axios.get(API); 
      users.value = res.data;
    } catch (e) {
      console.log(e);
      error.value = e.message;
    }
  }

  async function login(email, password) {
    try {
      const res = await axios.get(API , { email, password });
      return res.data;
      //
    } catch (e) {
      error.value = e.response ? e.response.data.message : e.message;
      throw e;
    }
  }

  onMounted(() => {
    load();
  });

  return { users, error, load, login };
}
