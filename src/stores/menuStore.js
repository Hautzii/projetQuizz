import { defineStore } from "pinia";
import {ref, computed} from "vue";

export const useMenuStore = defineStore('menu', () => {
  const opened = ref(false);

  function openMenu(){
    opened.value = true;
  }

  function closeMenu(){
    opened.value = false;
  }

  const isMenuBurgerOpened = computed(() => opened.value)

  return {opened, openMenu, closeMenu, isMenuBurgerOpened}
})