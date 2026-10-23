// För slut resultat:
const STORAGE_KEY = "quiz-results";
// För Spel in progress:
const PROGRESS_KEY = "quiz-progress";

// För spelarens namn:
const NAME_KEY = "quiz-player-name";


/* 

objektet som sparas ser ut såhär:
[{ name: "Maja", score: 7, total: 10, date: "2026-10-23T09:15:00.000Z" }, {...}];

 */  

// Hämta och spara resultatet

export function getResults() {
  const resultData = localStorage.getItem(STORAGE_KEY);
  try {
    return resultData !== null ? JSON.parse(resultData) : [];
  } catch (error) {
    console.error("Kunde inte läsa sparade resultat:", error);
    return [];
  }
}

export function saveResult(result) {
  const savedResults = getResults();
  const updatedResults = [...savedResults, result];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
}



// Hämta och spara status i spelet just nu (progress)
export function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function getProgress() {
  const progressData = localStorage.getItem(PROGRESS_KEY);

  if (progressData === null) {
    return null;
  }

  try {
    return JSON.parse(progressData);
  } catch (error) {
    console.error("Kunde inte läsa sparade quizframsteg:", error);
    return null;
  }
}

export function clearProgress() {
  localStorage.removeItem(PROGRESS_KEY);
}


// Spara och hämta namnet på spelaren
export function savePlayerName(name){
  localStorage.setItem(NAME_KEY, JSON.stringify(name));
}

export function getPlayerName(){
  const playerName = localStorage.getItem(NAME_KEY);

  if(playerName === null) return null;

  try {
    return JSON.parse(playerName);
  } catch (error) {
    console.error("Kunde inte hämta spelarens namn: ", error);
    return null;
  }
}