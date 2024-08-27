import { createRouter, createWebHistory } from 'vue-router'
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/connexion' }, 
    {path : '/inscription', component: SignUp},
    {path : '/connexion', component: Login}
  ]
})

export default router
