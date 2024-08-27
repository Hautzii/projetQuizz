<script setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
        <nav>
            <ul>
                <li class="nav-link">
                    <router-link class="nav-link" :to="{name: 'home'}">Accueil</router-link>
                </li>
                <li class="nav-link">
                    <router-link class="nav-link" :to="{name: 'quiz'}">Jouer</router-link>
                </li>
                <li class="nav-link">
                    <router-link class="nav-link" :to="{name: 'login'}">Se connecter</router-link>
                </li>
                <li class="nav-link">
                    <router-link class="nav-link" :to="{name: 'signup'}">S'inscrire</router-link>
                </li>
            </ul>
        </nav>
</template>

<style scoped>

.nav-link {
    text-decoration: none;
    color: #1F1F1F;
}

ul {
    margin: 0;
    padding: 12px;
    background-color: grey;
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

li {
    margin : 0 0.7rem;
}


</style>