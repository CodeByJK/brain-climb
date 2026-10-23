
// State objekt som håller koll på spelet (samlar variablerna på ett ställe)

const state = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: []
};



export function startQuiz(questions){
    // starta med alla frågor i state objektet.
    state.questions = [...questions];
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.userAnswers = [];
   

}

export function getCurrentQuestion(){
    const currentQuestion = state.questions[state.currentQuestionIndex];
    return currentQuestion;
}

export function answerQuestion(selectedIndex){
    const currentQuestion = getCurrentQuestion();
    if(!currentQuestion) return false;
    const questionId = currentQuestion.id;

    // Kolla så att användaren inte redan svarat på en fråga
    const existingAnswer = state.userAnswers.find((answer) => {
       return answer.questionId === questionId
    })

    if(existingAnswer) return existingAnswer.isCorrect;

    // Jämför valt svar med rätt svar
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    
    if(isCorrect) {
        state.score++;
    } 

    state.userAnswers.push({ questionId, selectedIndex, isCorrect });
   
    
    return isCorrect;
}

export function getResult(){

    return { 
        score: state.score, 
        total: state.questions.length
    }
}

export function nextQuestion(){
    // Står vi redan på sista frågan? Då finns ingen nästa.
    if (state.currentQuestionIndex >= state.questions.length - 1) return false;


    // Annars: gå ett steg framåt
    state.currentQuestionIndex++;
   

    return true;
}


export function isFinished(){
    // Returnerar true/false beroende på om svar arrayens längd är samma som frågorna: samma -> spelet slut
    return state.questions.length === state.userAnswers.length;
}

export function getState(){
    // Returnerar en kopia av state
    return structuredClone(state)
}


/**
 * Återställer en pågående runda, t.ex. efter omladdning eller sidbyte.
 * Fungerar som startQuiz, men med sparade värden i stället för nollor.
 * Läser inte från storage själv – main.js hämtar datan och skickar in den.
 *
 * Användning i main.js:
 *   const questions = await loadQuestions();
 *   const saved = getProgress();
 *   saved ? restoreQuiz(questions, saved) : startQuiz(questions);
 *
 * För att det ska finnas något att återställa: anropa
 * saveProgress(getState()) efter answerQuestion() och nextQuestion().
 * Anropa clearProgress() när quizet är klart.
 */

export function restoreQuiz(questions, progress){
    // Som startQuiz, men med sparade värden i stället för nollor
    state.questions = [...questions];
    state.currentQuestionIndex = progress.currentQuestionIndex;
    state.score = progress.score;
    state.userAnswers = [...progress.userAnswers];
}


