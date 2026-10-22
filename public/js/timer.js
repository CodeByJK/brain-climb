let intervalId = null;
let timeLeft = 0;

export function startTimer(seconds, onTick, onTimeUp) {
    stopTimer();

    timeLeft = seconds;

    onTick(timeLeft);

    if (timeLeft <= 0) {
        onTimeUp();
        return;
    }

    intervalId = setInterval(() => {
        timeLeft--;

        onTick(timeLeft);

        if (timeLeft <= 0) {
            stopTimer();
            onTimeUp();
        }
    }, 1000);
}

export function stopTimer() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

export function getTimeLeft() {
    return timeLeft;
}