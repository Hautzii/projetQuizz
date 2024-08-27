<script setup>

import {ref} from "vue";

const quizz = [
  {
    id: 1,
    question: "What is the largest ocean in the world?",
    answers: [
      "A - The Pacific Ocean",
      "B - The Atlantic Ocean",
      "C - The Arctic Ocean"
    ],
    correctAnswer: "A - The Pacific Ocean",
  },
  {
    id: 2,
    question: "What is the largest lake in the world?",
    answers: [
      "A - Lake Superior",
      "B - The Caspian Sea",
      "C - Lake Victoria"
    ],
    correctAnswer: "B - The Caspian Sea",
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    answers: [
      "A - Earth",
      "B - Mars",
      "C - Jupiter"
    ],
    correctAnswer: "B - Mars",
  },
  {
    id: 4,
    question: "What is the longest river in the world?",
    answers: [
      "A - The Amazon River",
      "B - The Nile River",
      "C - The Yangtze River"
    ],
    correctAnswer: "B - The Nile River",
  },
  {
    id: 5,
    question: "Which is the largest desert in the world?",
    answers: [
      "A - The Sahara Desert",
      "B - The Arabian Desert",
      "C - The Gobi Desert"
    ],
    correctAnswer: "A - The Sahara Desert",
  }
]


console.log(quizz);

const quizzIndex = ref(0);

// Navigation

function nextQuestion () {
  if (quizzIndex.value < quizz.length - 1) {
    quizzIndex.value++
  }
}

function previousQuestion () {
  if (quizzIndex.value > 0) {
    quizzIndex.value--
  }
}

// Valider réponse

const selectedAnswer = ref(null);
const isAnswerCorrect = ref(null);

function validateAnswer () {
  const currentQuiz = quizz[quizzIndex.value];
  if (selectedAnswer.value === currentQuiz.correctAnswer) {
    isAnswerCorrect.value = true;
  } else {
    isAnswerCorrect.value = false;
  }
};

</script>

<template>
  <div>
      <div class="home">
        <h1>Aperçu du jeu</h1>
      </div>
    
        <div class="quizz">
          <div class="question">
            <p id="question">{{ quizz[quizzIndex].question }} </p>
          </div>
        
          <div class="answers">
            <label v-for="answer in quizz[quizzIndex].answers" :key="answer">
              <input type="radio" :value="answer" v-model="selectedAnswer"/>
              {{ answer }}
            </label>
          </div>
        
          <div class="validation">
            <button class="validate-btn" @click="validateAnswer()">Validate</button>
            <p v-if="isAnswerCorrect === true" class="green">Nice !</p>
            <p v-else-if="isAnswerCorrect === false" class="red">False ! Try again :)</p>
            <!-- <p v-else>Mauvaise réponse</p> -->
          </div>
        
          <div class="navigation">
            <button @click="previousQuestion()">Previous</button>
            <button @click="nextQuestion()">Next</button>
          </div>
        </div>
  </div>
</template>

<style scoped>

h1 {
  text-align: center;
  margin: 2rem auto;
}


.quizz{
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ffecd5;
  border-radius: 10px;
  width: 80%;
  margin: auto;
  padding: 2rem;
  box-shadow: 3px 3px 5px rgba(133, 131, 131, 0.900);

}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation button {
  margin: 2rem 0.3rem 0 0.3rem;
}

#question {
  width: fit-content;
  margin-bottom: 1rem;
  font-size: 24px
}
.answers {
  width: fit-content;
  margin: 0.5rem;
}

label {
  margin: 1rem;
}

input {
  &:hover {
    cursor: pointer;
  }
}

.validation {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.validation p {
  text-align: center;
  margin-top: 0.5rem;
}

.validate-btn {
  margin-top: 1.5rem;
}

button {
  border-radius: 5px;
  padding: 0.5rem;
  border: 1px solid black;
  background-color: #ffecd5;
  color: #1E1E1E;
  width: 120px;

  &:hover {
    background-color: #1E1E1E;
    color: #ffecd5;
    cursor: pointer;
    border: 1px solid yellow;
  }
}

.green {
  color: lightgreen;
}

.red {
  color: rgb(249, 45, 45);
}

</style>