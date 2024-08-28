<script setup>
  import { useMenuStore } from '@/stores/menuStore.js';
  const menuStore = useMenuStore();
</script>

<template>
  <div class="burger-container">
    <button type="button" class="menu-burger" @click="menuStore.openMenu()">
      <span></span>
    </button>
  </div>
</template>

<style scoped>
  .burger-container {
    display: grid;
    place-items: center;
  }
  .menu-burger {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    background: none;
    border: none;
    padding: 1rem;
  }

  span {
    display: block;
    background: #ffecd5;
    width: 30px;
    height: 3px;
    border-radius: 1rem;

    &::before, &::after {
      content: '';
      position: relative;
      display: block;
      width: 30px;
      height: 3px;
      background: #ffecd5;
      border-radius: 1rem;
    }

    &::before {
      transform: translate(0, -8px);
    }

    &::after {
      transform: translate(0, 5px);
    }
  }
</style>
