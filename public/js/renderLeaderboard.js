// Formaterar datumet
function formatDate(isoString){
    return new Date(isoString).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
    });
}

function sortByScore(results){
    return results.toSorted((a, b) => b.score - a.score )
}

function createRow({ name, score, total, date, isCurrent = false }){
    const template = document.querySelector("#leaderboard-row-template");
    const clone = template.content.cloneNode(true);

    // Sätt is-current klass på senaste omgången
    clone.querySelector(".leaderboard-row").classList.toggle("is-current", isCurrent);
    clone.querySelector(".leaderboard-current-label").hidden = !isCurrent;

    clone.querySelector(".leaderboard-player").textContent = name;
    const timeElement = clone.querySelector(".leaderboard-meta time");
    timeElement.dateTime = date;
    timeElement.textContent = formatDate(date);

    const trackBar = clone.querySelector(".leaderboard-track-bar");

    for(let i = 0; i < total; i++) {
        const bar = document.createElement("span");
        bar.classList.toggle("is-filled", i < score);
        trackBar.append(bar);
    }

    clone.querySelector(".leaderboard-points").textContent = score;
    clone.querySelector(".leaderboard-total").textContent = `/${total}`;

    return clone;
}


export function renderLeaderboard(results) {
    const list = document.querySelector(".leaderboard-list");
    const emptyMessage = document.querySelector(".leaderboard-empty");
    const bestText = document.querySelector(".leaderboard-best");

    const isEmpty = results.length === 0;
    list.hidden = isEmpty;
    emptyMessage.hidden = !isEmpty;
    bestText.hidden = isEmpty;

    if(isEmpty) {
        list.replaceChildren();
        return;
    }

    const latest = results.at(-1);

    const sorted = sortByScore(results);

    const best = sorted[0];
    bestText.textContent = `Bäst hittills: ${best.name}, ${best.score} av ${best.total}`;

    const rows = sorted.map((result) => createRow({ ...result, isCurrent: result === latest }));
    list.replaceChildren(...rows);
}