
const STORAGE_KEY = "quiz-results";

export function getSavedResults(){
    const resultData = localStorage.getItem(STORAGE_KEY);
    try {
        return resultData !== null ? JSON.parse(resultData) : [];
    } catch (error) {
        console.error("Kunde inte läsa sparade resultat:", error);
        return [];
    }
}

export function saveResult(result) {
    const savedResults = getSavedResults();
    const updatedResults = [...savedResults, result];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
}

// Sparning av state objekt, för att kunna hålla koll på spelet även vid omladdning och byte mellan html sidor

const QUIZ_STATE_KEY = "quiz-state";

// Används av main.js om pågående runda ska sparas. Spara getState() efter varje svar/nästa fråga.
export function saveQuizState(state){
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
}

export function loadQuizState(){
    const data = localStorage.getItem(QUIZ_STATE_KEY);

    try {
        return data !== null ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Kunde inte läsa sparat quiz:", error);
        return null;
    }
}

export function clearQuizState() {
    localStorage.removeItem(QUIZ_STATE_KEY);
}