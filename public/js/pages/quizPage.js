import { loadQuestions } from "../api.js";

import {
  startQuiz,
  restoreQuiz,
  getCurrentQuestion,
  getState,
  getResult,
  nextQuestion,
  answerQuestion,
} from "../quiz.js";

import {
  getProgress,
  saveProgress,
  saveResult,
  clearProgress,
  getPlayerName,
} from "../storage.js";

import {
  renderQuestion,
  renderError,
  renderFeedback,
  renderTime,
  renderScore,
} from "../render.js";

import { startTimer, stopTimer } from "../timer.js";

const SECONDS_PER_QUESTION = 30;

// Visar den aktuella frågan
function showQuestion() {
  const { currentQuestionIndex, questions } = getState();

  renderQuestion(
    getCurrentQuestion(),
    currentQuestionIndex,
    questions.length,
    handleAnswer,
  );

  renderScore(getResult().score);

  startTimer(SECONDS_PER_QUESTION, renderTime, () => handleAnswer(null));
}

// Hanterar användarens svar
function handleAnswer(selectedIndex) {
  stopTimer();

  const question = getCurrentQuestion();
  const isCorrect = answerQuestion(selectedIndex);

  saveProgress(getState());

  renderScore(getResult().score);

  const { currentQuestionIndex, questions } = getState();
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  renderFeedback(question, selectedIndex, isCorrect, isLastQuestion);
}

// Går vidare till nästa fråga eller avslutar quizet
function handleNext() {
  const hasNextQuestion = nextQuestion();

  if (hasNextQuestion) {
    saveProgress(getState());
    showQuestion();
  } else {
    finishQuiz();
  }
}

// Avslutar quizet och sparar resultatet
function finishQuiz() {
  saveResult({
    name: getPlayerName() ?? "Anonym",
    ...getResult(),
    date: new Date().toISOString(),
  });

  clearProgress();

  location.href = "leaderboard.html";
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

    if (!getPlayerName()) {
      location.href = "../index.html";
      return;
    }

    const nextButton = document.querySelector("#next-button");

    if (nextButton) {
      nextButton.addEventListener("click", handleNext);
    }

    const state = getState();
    const currentQuestion = getCurrentQuestion();

    const alreadyAnswered = state.userAnswers.some(
      (answer) => answer.questionId === currentQuestion.id,
    );

    if (alreadyAnswered) {
      handleNext();
    } else {
      showQuestion();
    }
  } catch (error) {
    console.error(error);
    renderError("Kunde inte ladda frågorna");
  }
}
