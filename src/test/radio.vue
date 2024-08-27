<script setup>
import { ref } from 'vue';

const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const isAnswerCorrect = ref(null);

const quizz = [
  {
    id: 1,
    question: "Quel est le plus grand océan du monde ?",
    answers: [
      "A - L'océan Pacifique",
      "B - L'océan Atlantique",
      "C - L'océan Arctique"
    ],
    correctAnswer: "A - L'océan Pacifique"
  },
  {
    id: 2,
    question: "Quel est le plus grand désert du monde ?",
    answers: [
      "A - Le Sahara",
      "B - Le désert d'Arabie",
      "C - L'Antarctique"
    ],
    correctAnswer: "C - L'Antarctique"
  }
];

const nextQuestion = () => {
  if (currentQuestionIndex.value < quizz.length - 1) {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
    isAnswerCorrect.value = null;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedAnswer.value = null;
    isAnswerCorrect.value = null;
  }
};

const validateAnswer = () => {
  const currentQuiz = quizz[currentQuestionIndex.value];
  if (selectedAnswer.value === currentQuiz.correctAnswer) {
    isAnswerCorrect.value = true;
  } else {
    isAnswerCorrect.value = false;
  }
};
</script>


<template>
    <div class="home">
      <h1>Projet Front</h1>
    </div>
  
    <div class="quizz">
      <div class="question">
        <p>Question : {{ quizz[currentQuestionIndex].question }} </p>
      </div>
  
      <div class="answers">
        <label v-for="answer in quizz[currentQuestionIndex].answers" :key="answer">
          <input 
            type="radio" 
            :value="answer" 
            v-model="selectedAnswer" 
          />
          {{ answer }}
        </label>
      </div>
  
      <div class="validation">
        <button @click="validateAnswer" :disabled="!selectedAnswer">
          Valider la réponse
        </button>
        <p v-if="isAnswerCorrect === true">Bonne réponse !</p>
        <p v-else-if="isAnswerCorrect === false">Mauvaise réponse, essayez encore.</p>
      </div>
  
      <div class="navigation">
        <button @click="previousQuestion" :disabled="currentQuestionIndex === 0">
          Précédent
        </button>
        <button @click="nextQuestion" :disabled="currentQuestionIndex === quizz.length - 1">
          Suivant
        </button>
      </div>
    </div>
  </template>

