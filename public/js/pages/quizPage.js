import { loadQuestions } from "../api.js";

import {
  startQuiz,
  restoreQuiz,
  getCurrentQuestion,
  getState,
  nextQuestion,
  answerQuestion,
} from "../quiz.js";

import { getProgress, saveProgress } from "../storage.js";

import {
  renderQuestion,
  renderError,
  renderFeedback,
  renderTime,
} from "../render.js";

import { startTimer } from "../timer.js";


const SECONDS_PER_QUESTION = 30;

// Visar den aktuella frågan
function showQuestion() {
  const { currentQuestionIndex, questions } = getState();

  renderQuestion(
    getCurrentQuestion(),
    currentQuestionIndex,
    questions.length,
    handleAnswer
  );

  startTimer(
    SECONDS_PER_QUESTION,
    renderTime,
    () => handleAnswer(null)
  );
}

// Hanterar användarens svar
function handleAnswer(selectedIndex) {
  const question = getCurrentQuestion();
  const isCorrect = answerQuestion(selectedIndex);

  saveProgress(getState());

  renderFeedback(question, selectedIndex, isCorrect);
}

// Går vidare till nästa fråga
function handleNext() {
  const hasNextQuestion = nextQuestion();

  if (hasNextQuestion) {
    showQuestion();
  }
}

// Startar eller återställer quizet
export async function initQuizPage() {
  try {
    const questions = await loadQuestions();

    const savedProgress = getProgress();

    if (savedProgress) {
      restoreQuiz(questions, savedProgress);
    } else {
      startQuiz(questions);
    }

    const nextButton = document.querySelector("#next-button");

    if (nextButton) {
      nextButton.addEventListener("click", handleNext);
    }

    showQuestion();
  } catch (error) {
    console.error(error);
    renderError("Kunde inte ladda frågorna");
  }
}
