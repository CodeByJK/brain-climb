import { initStartPage } from "./pages/startPage.js";
import { initQuizPage } from "./pages/quizPage.js";
import { initLeaderboardPage } from "./pages/leaderboardPage.js";

const page = document.body.dataset.page;
if (page === "start") {
initStartPage();
} else if (page === "quiz") {
initQuizPage();
} else if (page === "leaderboard") {
initLeaderboardPage();
}
