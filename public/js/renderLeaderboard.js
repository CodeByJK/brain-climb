
function formatDate(isoString){
    return new Date(isoString).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
    });
}



 export function renderLeaderboard(results){
    const resultRowTemplate = document.querySelector("#leaderboard-row-template");
    const resultList = document.querySelector(".leaderboard-list");

    const resultsToRender = results.map(( {
        name,
        score,
        total,
        date,
    } ) => {
        const clone = resultRowTemplate.content.cloneNode(true);

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

    })

    resultList.replaceChildren(...resultsToRender);
}