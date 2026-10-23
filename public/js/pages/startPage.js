// startPage.js
// Startsidan: spara namnet och starta eller fortsätt quizet.

import {
  getPlayerName,
  savePlayerName,
  getProgress,
  clearProgress,
} from "../storage.js";

const QUIZ_URL = "html/quiz.html";

export function initStartPage() {
  const form = document.querySelector("#start-form");
  const nameInput = document.querySelector("#player-name");
  const resumeButton = document.querySelector("#resume-button");

  if (!form || !nameInput) return;

  // Fyll i namnet om det finns sparat
  const savedName = getPlayerName();
  if (savedName) {
    nameInput.value = savedName;
  }

  // Visa "Fortsätt" bara om det finns ett påbörjat quiz
  if (resumeButton && getProgress() !== null) {
    resumeButton.hidden = false;
  }

  // Enter eller klick på "Starta quiz"
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    if (!name) {
      nameInput.focus();
      return;
    }

    savePlayerName(name);
    clearProgress();
    location.href = QUIZ_URL;
  });

  // Fortsätt utan att rensa progress
  resumeButton?.addEventListener("click", () => {
    location.href = QUIZ_URL;
  });
}
