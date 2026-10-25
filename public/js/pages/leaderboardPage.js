import { renderLeaderboard } from "../renderLeaderboard.js";
import { getResults } from "../storage.js";

export function initLeaderboardPage() {
    renderLeaderboard(getResults());
}