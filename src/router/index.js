import { createRouter, createWebHistory } from 'vue-router'
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";
import UserView from "@/views/userView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', redirect: '/connexion' }, 
    {path : '/inscription', component: SignUp},
    {path : '/connexion', component: Login},
    {path : '/utilisateur', component: UserView},
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue')
    }
  ]
})

export default router
