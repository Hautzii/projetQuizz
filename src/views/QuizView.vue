<script setup>
import { ref } from 'vue'
const questions = ref(0)
const categories = ref(0)
const difficulty = ref(0)
</script>

<template>
  <div>
    <label for="questions">Nombre de questions</label>
    <input type="number" id="questions" v-model="questions" />
    <label for="categories">Catégories</label>
    <select name="categories" id="categories" v-model="categories">
      <option value="0">Any category</option>
      <option value="1">General knowledge</option>
      <option value="2">Entertainment: Books</option>
      <option value="3">Entertainment: Film</option>
      <option value="4">Entertainment: Music</option>
      <option value="5">Entertainment: Musicals &amp; Theatres</option>
      <option value="6">Entertainment: Television</option>
      <option value="7">Entertainment: Video Games</option>
      <option value="8">Entertainment: Board Games</option>
      <option value="9">Science &amp; Nature</option>
      <option value="10">Science: Computers</option>
      <option value="11">Science: Mathematics</option>
      <option value="12">Mythology</option>
      <option value="13">Sports</option>
      <option value="14">Geography</option>
      <option value="15">History</option>
      <option value="16">Politics</option>
      <option value="17">Art</option>
      <option value="18">Celebrities</option>
      <option value="19">Animals</option>
      <option value="20">Vehicles</option>
      <option value="21">Entertainment: Comics</option>
      <option value="22">Science: Gadgets</option>
      <option value="23">Entertainment: Japanese Anime &amp; Manga</option>
      <option value="24">Entertainment: Cartoons &amp; Animations</option>
    </select>
    <label for="difficulty">Difficulté</label>
    <select name="difficulty" id="difficulty" v-model="difficulty">
      <option value="any">Any difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    <label for="type">Type de questions :</label>
    <select name="type" id="type">
      <option value="any">Any type</option>
      <option value="multiple">Multiple choice</option>
      <option value="boolean">True / False</option>
    </select>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>