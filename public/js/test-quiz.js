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

function getResult(){

    return { 
        score: state.score, 
        total: state.questions.length
    }
}

getCurrentQuestion();
answerQuestion(1);
answerQuestion(1);
answerQuestion(1);
