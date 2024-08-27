<script setup>
import { RouterView } from 'vue-router'
import HeaderLayout from '@/layouts/HeaderLayout.vue'
import FooterLayout from '@/layouts/FooterLayout.vue'
</script>

<template>
  <HeaderLayout/>
  <RouterView />
  <FooterLayout/>
</template>

<style scoped>

</style>
