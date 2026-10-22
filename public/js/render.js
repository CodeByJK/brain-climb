const timerElement = document.querySelector(".timer span");

export function renderTime(seconds) {
    if (!timerElement) {
        return;
    }

    timerElement.textContent = seconds;
}