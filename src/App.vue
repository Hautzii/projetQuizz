<script setup>
import { RouterView } from 'vue-router';
import BarreNavigation from "@/components/BarreNavigation.vue";
</script>

<template>
  <BarreNavigation />
  <RouterView />
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
