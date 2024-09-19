import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
      userId: null,
      loggedInUser: null,
    }),
    actions: {
      setUserId(id) {
        this.userId = id;
      },
      setLoggedInUser(user) {
        this.loggedInUser = user;
      },
      clearUser() {
        this.userId = null;
        this.loggedInUser = null;
      }
    }
  });
  