<script setup>
  import MenuExtendedLayout from '@/layouts/MenuExtendedLayout.vue';
  import ButtonBurger from '@/buttons/ButtonBurger.vue';
  import MenuInBurgerLayout from '@/layouts/MenuInBurgerLayout.vue';
  import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="container">
    <p>
        <router-link class="nav-link" :to="{name: 'home'}">Projet Quizz</router-link>
    </p>
    <div class="extended-menu"><MenuExtendedLayout/></div>
    <div class="burger-menu"><ButtonBurger/></div>
    
    <MenuInBurgerLayout/>
  </header>
</template>

<style scoped>
  .container {
    background: rgb(75, 75, 75);
    box-shadow: 0px 1px 1px 2px rgba(133, 131, 131, 0.900);
    color: #ffecd5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }

  .nav-link {
    text-decoration: none;
    color: #ffecd5;
    margin: 1rem;
}

  @media (max-width: 768px) {
    .extended-menu {
      display: none;
    }
  }

  @media (min-width: calc(768px + 1px)) {
    .burger-menu {
      display: none;
    }
  }
</style>
