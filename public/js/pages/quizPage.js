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

import {
  playCorrectSound,
  playIncorrectSound,
  toggleSound,
} from "../sounds.js";

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

  // Spela ljud om användaren har valt ett svar
  if (selectedIndex !== null) {
    if (isCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  }

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

    // Hanterar knappen för ljud av och på
    const soundButton = document.querySelector("#sound-toggle");

    if (soundButton) {
      soundButton.addEventListener("click", () => {
        const soundEnabled = toggleSound();

        soundButton.textContent = soundEnabled ? "🔊" : "🔇";
        soundButton.setAttribute(
          "aria-label",
          soundEnabled ? "Stäng av ljud" : "Sätt på ljud",
        );
        soundButton.setAttribute("aria-pressed", String(soundEnabled));
      });
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
