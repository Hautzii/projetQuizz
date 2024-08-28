<script setup>
import { ref, computed } from "vue";

// State variables
const numberOfQuestions = ref(5);
const categories = ref("any");
const difficulty = ref("any");
const type = ref("any");
const activeGame = ref(false);
const score = ref(0);
const playerAnswer = ref("");
const currentQuestionIndex = ref(0);
const questions = ref([]);
const quizFinished = ref(false);
const incorrectAnswers = ref([]);
const timerEnabled = ref(false);
const useTimer = ref(30);
const remainingTime = ref(useTimer.value);
const timerInterval = ref(null);

// Computed properties
const API_URL = computed(() => {
  let url = `https://opentdb.com/api.php?amount=${numberOfQuestions.value}&encode=url3986`;
  if (categories.value !== "any") url += `&category=${categories.value}`;
  if (difficulty.value !== "any") url += `&difficulty=${difficulty.value}`;
  if (type.value !== "any") url += `&type=${type.value}`;
  return url;
});

const isFormValid = computed(() => 
  numberOfQuestions.value > 0 && 
  (!timerEnabled.value || (timerEnabled.value && useTimer.value > 0))
);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || {});

const currentAnswers = computed(() => {
  if (!currentQuestion.value.correct_answer) return [];
  return [
    currentQuestion.value.correct_answer,
    ...currentQuestion.value.incorrect_answers,
  ].sort(() => Math.random() - 0.5);
});

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});

// Helper functions
function decodeAPIResponse(text) {
  return decodeURIComponent(text);
}

const fetchQuestions = async () => {
  const response = await fetch(API_URL.value);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

const processQuestions = (data) => {
  return data.results.map((q) => ({
    ...q,
    question: decodeAPIResponse(q.question),
    correct_answer: decodeAPIResponse(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map(decodeAPIResponse),
  }));
};

// Main functions
const generateQuestions = async () => {
  try {
    const data = await fetchQuestions();
    questions.value = processQuestions(data);
    currentQuestionIndex.value = 0;
    activeGame.value = true;
    startTimer();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

const handleIncorrectAnswer = () => {
  incorrectAnswers.value.push({
    question: currentQuestion.value.question,
    userAnswer: playerAnswer.value,
    correctAnswer: currentQuestion.value.correct_answer,
  });
};

const playerSubmitHandler = () => {
  clearInterval(timerInterval.value);
  if (playerAnswer.value !== currentQuestion.value.correct_answer) {
    handleIncorrectAnswer();
  } else {
    score.value++;
  }
  if (++currentQuestionIndex.value >= questions.value.length) {
    finishGame();
  } else {
    startTimer();
  }
  playerAnswer.value = "";
};

const resetGame = () => {
  clearInterval(timerInterval.value);
  score.value = 0;
  quizFinished.value = false;
  activeGame.value = false;
  incorrectAnswers.value = [];
  questions.value = [];
  currentQuestionIndex.value = 0;
  playerAnswer.value = "";
  remainingTime.value = useTimer.value;
};

const startGame = () => {
  resetGame();
  generateQuestions();
};

const startTimer = () => {
  if (timerEnabled.value) {
    clearInterval(timerInterval.value);
    remainingTime.value = useTimer.value;
    timerInterval.value = setInterval(() => {
      remainingTime.value--;
      if (remainingTime.value <= 0) {
        clearInterval(timerInterval.value);
        playerSubmitHandler();
      }
    }, 1000);
  }
};

const finishGame = () => {
  activeGame.value = false;
  quizFinished.value = true;
  clearInterval(timerInterval.value);
};
</script>

<template>
  <div class="main-container">
    <form @submit.prevent="startGame" v-if="!activeGame && !quizFinished">
      <label for="numberOfQuestions">Number of questions</label>
      <input type="number" id="questions" v-model="numberOfQuestions" />
      <label for="categories">Categories</label>
      <select name="categories" id="categories" v-model="categories" value="0">
        <option value="any">Any category</option>
        <option value="9">General knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals &amp; Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoons &amp; Animations</option>
      </select>
      <label for="difficulty">Difficulty</label>
      <select name="difficulty" id="difficulty" v-model="difficulty" value="any">
        <option value="any">Any difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <label for="type">Type of questions:</label>
      <select name="type" id="type" v-model="type" value="any">
        <option value="any">Any type</option>
        <option value="multiple">Multiple choice</option>
        <option value="boolean">True / False</option>
      </select>
      <label for="timerEnabled">Enable Timer</label>
      <input type="checkbox" id="timerEnabled" v-model="timerEnabled" />

      <label for="timerDuration" v-if="timerEnabled">
        Time per question (seconds)
      </label>
      <input
        type="number"
        id="timerDuration"
        v-model="useTimer"
        min="1"
        max="60"
        :disabled="!timerEnabled"
        v-if="timerEnabled"
      />
      <button :disabled="!isFormValid" class="submit-button">Play!</button>
    </form>
    <div v-if="activeGame" class="active-game">
      <h1>Question {{ currentQuestionIndex + 1 }} of {{ numberOfQuestions }}</h1>
      <h2>{{ timerEnabled ? "Time Remaining:" : "Question:" }}</h2>
      <p v-if="timerEnabled" class="timer">{{ formattedTime }}</p>
      <p class="question">{{ currentQuestion.question }}</p>
      <div class="answer-buttons">
        <button
          v-for="answer in currentAnswers"
          :key="answer"
          @click="playerAnswer = answer"
          :class="{ selected: playerAnswer === answer }"
        >
          {{ answer }}
        </button>
      </div>
      <button
        class="submit-button"
        @click="playerSubmitHandler"
        :disabled="!playerAnswer"
      >
        Submit
      </button>
    </div>
    <div v-if="quizFinished" class="quiz-finished">
      <h2>Quiz Finished!</h2>
      <p>Your final score: {{ score }} out of {{ numberOfQuestions }}</p>
      <div v-if="incorrectAnswers.length > 0">
        <h3>Incorrect Answers:</h3>
        <ul class="incorrect-answers-list">
          <li
            v-for="(item, index) in incorrectAnswers"
            :key="index"
            class="incorrect-answer-item"
          >
            <p><span>Question:</span> {{ item.question }}</p>
            <p class="player-answer"><span>Your answer:</span> {{ item.userAnswer }}</p>
            <p class="correct-answer"><span>Correct answer:</span> {{ item.correctAnswer }}</p>
          </li>
        </ul>
      </div>
      <button @click="resetGame" class="submit-button">Play Again</button>
    </div>
  </div>
</template>

<style scoped>
/* Define variables */
.main-container {
  --primary-color: #41b883;
  --primary-hover-color: #329066;
  --background-color: #f0f0f0;
  --text-color: #333;
  --border-color: #ccc;
  --border-radius: 0.5rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  max-width: 750px;
  margin: auto;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--text-color);
  padding: 2rem 1.5rem;
  border-radius: var(--border-radius);
}

li {
  list-style: none;
}

label:first-of-type {
  margin-top: 0;
}

label {
  margin-top: 0.5rem;
}

.form-control {
  text-align: center;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  margin-top: 0.5rem;
}

select,
input {
  text-align: center;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  margin-top: 0.5rem;
}

span {
  font-weight: bold;
}

.answer-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1rem;
  align-items: center;
}

.answer-buttons button {
  background-color: var(--background-color);
  color: var(--text-color);
  width: 250px;
  word-wrap: break-word;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.answer-buttons button:hover {
  background-color: var(--primary-hover-color);
}

.answer-buttons button.selected {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.submit-button {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: 0.3s ease-in-out;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: var(--primary-hover-color);
}

.submit-button:disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
}

.incorrect-answers-list {
  padding: 0;
  width: 100%; /* Ensure the list takes full width of the parent */
  max-width: 600px; /* Limit the maximum width for better readability */
}

h1 {
  margin-bottom: 2.5rem;
}

h3 {
  margin-top: 1rem;
}

.player-answer, .correct-answer {
  margin-top: 0.5rem;
}

.incorrect-answer-item {
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  margin-bottom: 1rem;
}

.incorrect-answer-item:last-child {
  border-bottom: none;
}

input[type="checkbox"] {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

input[type="number"] {
  text-align: center;
  width: 5rem;
}

.timer,
.question {
  font-size: 1.5rem;
  font-weight: bold;
}

.timer {
  margin-top: 1rem;
}

.question {
  margin-top: 1rem;
}
.active-game, .quiz-finished {
  background-color: var(--text-color);
  width: 75vw;
  padding: 2rem 1rem;
  border-radius: 1rem;
}

.quiz-finished {
  background-color: var(--text-color);
  width: 75vw;
  max-height: 80vh; /* Limit the maximum height */
  padding: 2rem 1rem;
  border-radius: 1rem;
  overflow-y: auto; /* Add vertical scrollbar when content exceeds max-height */
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>