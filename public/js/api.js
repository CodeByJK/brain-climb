
/**
 * Hämtar alla frågor från question.json.
 * Kastar ett fel om hämtningen misslyckas – anroparen ansvarar för try/catch.
 *
 * Obs: sökvägen räknas från HTML-sidan som laddar main.js, inte från denna fil.
 *
 * Användning i main.js:
 *   try {
 *     const questions = await loadQuestions();
 *     startQuiz(questions);
 *   } catch (error) {
 *     console.error(error);
 *     // visa felmeddelande för användaren
 *   }
 */


export async function loadQuestions(){
    const response = await fetch("../data/question.json");

    if(!response.ok){
        throw new Error(`Kunde inte hämta frågor: ${response.status}`);
    }

    return response.json();
}

