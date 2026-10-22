async function loadQuestions(){
    const response = await fetch("../data/question.json");

    if(!response.ok){
        throw new Error(`Kunde inte hämta frågor: ${response.status}`);
    }

    return response.json();
}

const loadedQuestions = await loadQuestions();

// State objekt som håller koll på spelet (samlar variablerna på ett ställe)

const state = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: []
};

startQuiz(loadedQuestions);

function startQuiz(questions){
    // starta med alla frågor i state objektet.
    state.questions = [...questions];
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.userAnswers = [];

}

function getCurrentQuestion(){
    const currentQuestion = state.questions[state.currentQuestionIndex];
    return currentQuestion;
}

function answerQuestion(selectedIndex){
    const currentQuestion = getCurrentQuestion();
    let correct = false;
    const questionId = currentQuestion.id;

    if(selectedIndex === currentQuestion.correctAnswer) {
        state.score++;
        correct = true;
    } else {
        // Ska klasser och sådant läggas till här?
    }

    
    state.userAnswers.push({ questionId, selectedIndex, correct });
    console.log(state)
    return correct;

}

function getScore(){


    return { score, total }
}

console.log(answerQuestion(1))
console.log(getCurrentQuestion());

