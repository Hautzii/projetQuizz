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
  isAnswerCorrect.value = selectedAnswer.value === currentQuiz.correctAnswer;
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
      <div
        v-for="answer in quizz[currentQuestionIndex].answers"
        :key="answer"
        @click="selectedAnswer = answer"
        :class="{ selected: selectedAnswer === answer }"
        class="answer-option"
      >
        {{ answer }}
      </div>
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

<style scoped>
h1 {
  text-align: center;
  margin: auto;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.answer-option {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

.answer-option:hover {
  background-color: #e0e0e0;
}

.selected {
  background-color: #d0f0c0;
  border-color: #8bc34a;
}

.validation {
  margin-top: 20px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
