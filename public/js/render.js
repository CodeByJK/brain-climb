// render.js
// Visar data på sidan. Räknar ingenting och importerar inget från quiz.js.

// Alla element på ett ställe. Ändra här om HTML:en ändras.
const selectors = {
  questionText: ".quiz-question .question",
  questionCounter: ".numbers .question-number p",
  options: ".answers",
  timer: '[role="timer"] span',
  error: "#error-message",
  result: "#score-text",
};

const letters = ["A", "B", "C", "D", "E", "F"];

const getElement = (selector) => document.querySelector(selector);

/* ---------- Hjälpfunktion utan DOM ---------- */

// 105 -> "1:45", 5 -> "0:05"
export function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const rest = String(safeSeconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

/* ---------- Frågesidan ---------- */

// index är 0-baserat: index 2 visas som "Fråga 3 av 10"
export function renderQuestion(question, index, total, onAnswer) {
  const textElement = getElement(selectors.questionText);
  const counterElement = getElement(selectors.questionCounter);
  const optionsElement = getElement(selectors.options);

  // Elementen finns inte på alla sidor
  if (!textElement || !optionsElement) return;

  textElement.textContent = question.question;

  if (counterElement) {
    counterElement.textContent = `Fråga ${index + 1} av ${total}`;
    // Följer ni designen ("1/10") i stället:
    // counterElement.textContent = `${index + 1}/${total}`;
  }

  // Töm gamla alternativ (även testknapparna i HTML:en)
  optionsElement.replaceChildren();

  question.answers.forEach((answer, answerIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer"; // samma klass som i HTML:en, så CSS:en gäller
    button.textContent = `${letters[answerIndex]}. ${answer}`; // textContent, inte innerHTML
    button.addEventListener("click", () => onAnswer(answerIndex));
    optionsElement.append(button);
  });
}

export function renderTime(seconds) {
  const timerElement = getElement(selectors.timer);
  if (!timerElement) return;

  timerElement.textContent = seconds;
}

export function renderError(message) {
  const errorElement = getElement(selectors.error);
  if (!errorElement) return;

  errorElement.textContent = message;
  errorElement.hidden = false;
}

// renderFeedback(...) byggs i feedback-ticketen

/* ---------- Resultatsidan ---------- */

export function renderResult({ score, total }) {
  const resultElement = getElement(selectors.result);
  if (!resultElement) return;

  resultElement.textContent = `${score} av ${total} rätt`;
}
