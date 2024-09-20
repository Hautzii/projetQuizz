<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue"

const router = useRouter();
const score = ref(0);

const sampleQuestions = ref([
  {
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: ["Mount Kilimanjaro", "Mount Everest", "K2", "Makalu"],
    correctAnswer: "Mount Everest",
  },
  {
    question: "What is the largest ocean in the world?",
    answers: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
]);

const currentQuestionIndex = ref(0);
const selectedAnswer = ref("");

const checkAnswer = () => {
  if (selectedAnswer.value === sampleQuestions.value[currentQuestionIndex.value].correctAnswer) {
    score.value++;
  }
  selectedAnswer.value = '';
  
  if (currentQuestionIndex.value === sampleQuestions.value.length - 1) {
    // Last question answered, show score for 2 seconds before resetting
    setTimeout(() => {
      currentQuestionIndex.value = 0;
      setTimeout(() => {
        score.value = 0;
      }, 2000);
    }, 500);
  } else {
    currentQuestionIndex.value++;
  }
};

const navigateTo = (route) => {
  router.push(route);
};
</script>

<template>
  <div class="home content-container">
    <NavBar />

    <h1>Welcome to the Quiz Game!</h1>
    <p>
      Test your knowledge with our exciting quizzes. Here's some sample
      questions:
    </p>

    <div class="sample-quiz">
      <h2>{{ sampleQuestions[currentQuestionIndex].question }}</h2>
      <p v-if="currentQuestionIndex === 0 && score > 0">
        Your Score: {{ score }} / {{ sampleQuestions.length }}
      </p>
      <div class="answer-buttons">
        <button
          v-for="answer in sampleQuestions[currentQuestionIndex].answers"
          :key="answer"
          @click="selectedAnswer = answer"
          :class="{ selected: selectedAnswer === answer }"
        >
          {{ answer }}
        </button>
      </div>
      <div class="submit-button-wrapper">
        <button
          @click="checkAnswer"
          :disabled="!selectedAnswer"
          class="submit-button"
        >
          Submit
        </button>
      </div>
    </div>

    <div class="cta">
      <h3>Ready to take on the full quiz?</h3>
      <button @click="navigateTo('/quiz')" class="start-quiz-button">
        Start Quiz
      </button>
    </div>
  </div>
</template>

<style scoped>
.content-container {
  padding-top: 80px;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

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
  background-color: #f0f0f0;
}

.sample-quiz {
  background-color: #424242;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sample-quiz h2 {
  text-align: center;
}

.sample-quiz p {
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.answer-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.answer-buttons button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  border-radius: 0.25rem;
}

.answer-buttons button:hover {
  background-color: #dddcdc;
}

.answer-buttons button.selected {
  background-color: #41b883;
  font-weight: bold;
  color: #f0f0f0;
}

.submit-button-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
}

.submit-button {
  padding: 0.5rem 1rem;
  background-color: #41b883;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 0.25rem;
}

.submit-button,
.start-quiz-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #41b883;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 0.25rem;
}

.submit-button:hover,
.start-quiz-button:hover {
  background-color: #329066;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.cta {
  margin-top: 2rem;
  text-align: center;
}

.start-quiz-button {
  font-size: 1.2rem;
  padding: 0.75rem 1.5rem;
}

@media screen and (max-width: 600px) {
  h1,
  p {
    text-align: center;
  }
  p {
    margin-top: 1rem;
    line-height: 1.5;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1280px) {
  .home {
    margin-top: 2rem;
  }
}
</style>
