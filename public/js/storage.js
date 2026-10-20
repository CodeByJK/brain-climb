
const STORAGE_KEY = "quiz-results";

export function getResults(){
    const resultData = localStorage.getItem(STORAGE_KEY);
    try {
        return resultData !== null ? JSON.parse(resultData) : [];
    } catch (error) {
        console.error("Kunde inte läsa sparade resultat:", error);
        return [];
    }
}

export function saveResult(result) {
    const savdeResults = getResults();
    const updatedResults = [...savdeResults, result];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
}