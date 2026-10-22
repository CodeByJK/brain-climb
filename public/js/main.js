import { getResults, saveResult } from "./storage.js";
import { startTimer, stopTimer } from "./timer.js";
import { renderTime } from "./render.js";

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
