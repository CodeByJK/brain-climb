// render.js
// Visar data på sidan. Räknar ingenting och importerar inget från quiz.js.

// Alla element på ett ställe. Ändra här om HTML:en ändras.
const selectors = {
  questionText: ".quiz-question .question",
  questionCounter: ".numbers .question-number p  span", //Ändrade så att bara den Orange:a bokstaven ändras D2 - Raul
  questionBar: ".question-bar",
  options: ".answers",
  timer: '[role="timer"] span',
  error: "#error-message",
  result: "#score-text",
  feedbackCorrect: ".correct-answer",
  feedbackIncorrect: ".incorrect-answer",
  nextButton: ".next-question",
  score: ".score p", // Tillagt för att få C4 att fungera - Johanna
  scoreJarImg: ".score-jar img", //Burk bilderna för D2 - Raul
};

const letters = ["A", "B", "C", "D", "E", "F"];

const getElement = (selector) => document.querySelector(selector);

// Döljer feedback och "Nästa fråga" inför en ny fråga
function hideFeedback() {
  [selectors.feedbackCorrect, selectors.feedbackIncorrect, selectors.nextButton]
    .map(getElement)
    .forEach((element) => {
      if (element) element.hidden = true;
    });
}

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
  const barElement = getElement(selectors.questionBar)

  // Elementen finns inte på alla sidor
  if (!textElement || !optionsElement) return;

  hideFeedback();

  textElement.textContent = question.question;

  // Alla Element som ändras med frågorna D2 - Raul
  if (counterElement) {
    counterElement.textContent = index + 1;
  }

  if(barElement) {
    [...barElement.children].forEach((segment, i) => {
      segment.classList.toggle("is-filled", i === index)
    });
  }

  // Töm gamla alternativ (även testknapparna i HTML:en)
  optionsElement.replaceChildren();

  question.answers.forEach((answer, answerIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = `${letters[answerIndex]}. ${answer}`;
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

// selectedIndex är null om tiden tog slut innan användaren svarade
export function renderFeedback(question, selectedIndex, isCorrect) {
  const optionsElement = getElement(selectors.options);
  const section = getElement(
    isCorrect ? selectors.feedbackCorrect : selectors.feedbackIncorrect,
  );
  const nextButton = getElement(selectors.nextButton);

  if (!optionsElement || !section) return;

  // Lås alternativen och markera rätt och fel med både färg och tecken
  optionsElement.querySelectorAll("button").forEach((button, index) => {
    button.disabled = true;

    if (index === question.correctAnswer) {
      button.classList.add("is-correct");
      button.textContent += " ✓";
    } else if (index === selectedIndex) {
      button.classList.add("is-wrong");
      button.textContent += " ✗";
    }
  });

  // Vid fel svar: rubrik och vilket svar som var rätt
  if (!isCorrect) {
    const title = section.querySelector("h3");
    const correctText = section.querySelector("header p");
    const correctAnswer = question.answers[question.correctAnswer];

    if (title) {
      title.textContent =
        selectedIndex === null ? "Tiden tog slut" : "Nära, men nej";
    }
    if (correctText) {
      correctText.textContent = `Rätt svar är ${correctAnswer}`;
    }
  }

  // Förklaringen är <p> direkt under sektionen (efter "Visste du?")
  const explanation = section.querySelector(":scope > p");
  if (explanation) {
    explanation.textContent = question.explanation ?? "";
  }

  section.hidden = false;

  // Visa "Nästa fråga" och flytta fokus dit, så att tangentbordet fungerar
  if (nextButton) {
    nextButton.hidden = false;
    nextButton.focus();
  }
}

/* ---------- Resultatsidan ---------- */

export function renderResult({ score, total }) {
  const resultElement = getElement(selectors.result);
  if (!resultElement) return;

  resultElement.textContent = `${score} av ${total} rätt`;
}

// Used by C4 to update the player's score during the quiz. - Johanna
//Jag kommer använda samma Js så att den inte behöver definiera något nytt för D2 - Raul

export function renderScore(score) {
  const resultElement = getElement(selectors.score);
  if (resultElement) {
  resultElement.textContent = `${score} rätt`;
  }

  const jarElement = getElement(selectors.scoreJarImg);
  if (jarElement) {
    jarElement.src = `../assets/img/score-jar-${score}.png`;
    jarElement.alt = ``
  }
  
}
