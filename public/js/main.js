import { getResults, saveResult } from "./storage.js";
import { startTimer, stopTimer } from "./timer.js";
import { renderTime } from "./render.js";
import { fetchQuestions } from "./questionService.js";

// Timer
function handleTimeUp() {
    console.log("Tiden är slut!");
}

function updateTimer(seconds) {
    renderTime(seconds);
    console.log("Tid kvar:", seconds);
}

if (document.querySelector(".timer")) {
    startTimer(30, updateTimer, handleTimeUp);
}


const errorMessage = document.querySelector("#error-message");

// Läser in frågorna från JSON-filen
async function testQuestions() {
try {
const questions = await fetchQuestions();
console.log(questions);
} catch (error) {
console.error(error);

    if (errorMessage) {
        errorMessage.textContent = "Kunde inte ladda frågorna";
        errorMessage.hidden = false;
    }
}

}

testQuestions();