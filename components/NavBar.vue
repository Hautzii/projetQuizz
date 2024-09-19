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
  width: 100%;
  margin-bottom: 2rem;
}

nav ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;
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