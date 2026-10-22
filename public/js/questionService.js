export async function fetchQuestions() {
    const response = await fetch("../data/question.json");

    if (!response.ok) {
        throw new Error("Kunde inte ladda frågorna");
    }

    const questions = await response.json();

    return questions;
}

