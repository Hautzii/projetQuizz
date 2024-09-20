<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (route) => {
  router.push(route);
};
</script>

<template>
  <nav>
    <ul>
      <li @click="navigateTo('/')">Home</li>
      <li @click="navigateTo('/quiz')">Quiz</li>
      <li @click="navigateTo('/login')">Login</li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  z-index: 1000;
}

nav ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  padding: 1rem 0;
  margin: 0;
}

nav li {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav li:hover {
  background-color: #fcedd8;
  color: #1e1e1e;
}
</style>