let audioContext = null;
let soundEnabled = true;

// Skapar eller hämtar ljudmotorn
function getAudioContext() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}

// Spelar upp en enskild ton
function playTone(frequency, duration, startTime = 0) {
    const context = getAudioContext();

    const oscillator = context.createOscillator();
    const volume = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    volume.gain.setValueAtTime(0.15, context.currentTime + startTime);
    volume.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + startTime + duration
    );

    oscillator.connect(volume);
    volume.connect(context.destination);

    oscillator.start(context.currentTime + startTime);
    oscillator.stop(context.currentTime + startTime + duration);
}

// Ljud när svaret är rätt
export function playCorrectSound() {
    if (!soundEnabled) return;

    playTone(660, 0.15);
    playTone(880, 0.2, 0.15);
}

// Ljud när svaret är fel
export function playIncorrectSound() {
    if (!soundEnabled) return;

    playTone(300, 0.25);
}

// Växlar mellan ljud på och av
export function toggleSound() {
    soundEnabled = !soundEnabled;
    return soundEnabled;
}