<script setup>
import IconCross from '@/icons/IconCross.vue';
import { useMenuStore } from '@/stores/menuStore';
const menuStore = useMenuStore();
const {closeMenu} = menuStore;

</script>

<template>
    <nav :class="{opened: menuStore.isMenuBurgerOpened}">
        
            <div class="menu-header">
                <button type="button" class="close-menu-btn" @click="menuStore.closeMenu()"><IconCross class="close-icon"/></button>
            </div>

            <div class="menu-link">
                <ul>
                    <li class="nav-link">
                        <router-link class="nav-link" :to="{name: 'home'}" @click="closeMenu()">Accueil</router-link>
                    </li>
                    <li class="nav-link">
                        <router-link class="nav-link" :to="{name: 'quiz'}" @click="closeMenu()">Jouer</router-link>
                    </li>
                    <li class="nav-link">
                        <router-link class="nav-link" :to="{name: 'login'}" @click="closeMenu()">Se connecter</router-link>
                    </li>
                    <li class="nav-link">
                        <router-link class="nav-link" :to="{name: 'signup'}" @click="closeMenu()">S'inscrire</router-link>
                    </li>
                </ul>
            </div>

    </nav>
</template>

<style scoped>
  nav {
    padding: 3rem 3rem 6rem 3rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: rgb(75,75,75);
    transform: translate(0, -100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1;
  }

  nav.opened {
    transform: translate(0, 0);
    transition: transform 0.3s ease-in-out;
    box-shadow: 0px 1px 1px 2px rgba(133, 131, 131, 0.900);
  }

  .menu-header {
    display: flex;
    justify-content: flex-end;
    margin: auto;
    width: 96%;
    position: sticky;
    margin-bottom: 2rem;
  }

  .menu-link {
    width: 90%;
    margin: auto;
  }

  h4 {
    color:#ffecd5;
    text-transform: uppercase;
    margin: 0;
  }

  .close-menu-btn {
    cursor: pointer;
    background: none;
    border: none;
    color: #ffecd5;
  }

  ul {
    margin: 0;
    border-left: 1px solid #ffecd5;
    border-right: 1px solid #ffecd5;
  }
  
  li {
    display: block;
    text-align: center;
    padding: 0.5rem;
    margin: auto;
    color: #ffecd5;
    cursor: pointer;

    &:hover {
      font-style: italic;
    }
  }

  .nav-link {
    width: 100%;
    text-decoration: none;
    color: #ffecd5;
  }

  .close-icon:hover {
    transform: rotate(-180deg);
    transition: transform 0.6s ease-in-out;
  }
  
</style>
