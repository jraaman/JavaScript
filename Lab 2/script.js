function containsNonLetters(myString) {
    str = myString.toLowerCase();

    for (let i = 0; i < str.length; i++) {
        char = str[i];
        if (char < 'a' || char > 'z') {
            if (char !== 'å' && char !== 'ä' && char !== 'ö')
                return true;
        }
    }
    return false;
}

const quizSelectionForm = document.getElementById('quiz-selection-form');
const quizChoice = document.getElementById('quizzes');
const fullQuizContainer = document.getElementById('full-quiz');


// Quiz creation:
const question1 = {type: 'radio', numOfAlternatives: 4, correctAnswers: [0], required: true, question: 'What is the capital of Azerbaijan?', alternatives: ['Baku', 'Kayseri', 'Jerevan', 'Tblisi']};
const question2 = {type: 'check', numOfAlternatives: 6, correctAnswers: [0,2,4], required: true, question: 'Which of the following are places in Sweden?', alternatives: ['Vilhelmina', 'Trofors', 'Puoltikasvaara', 'Kristiansand', 'Dorotea', 'Uleåborg']};
const question3 = {type: 'text', numOfAlternatives: 0, correctAnswers: ['tetris'], required: false, question: 'What is the name of the classic 1980s video game based on falling blocks created by a Soviet programmer?', alternatives: []};
const question4 = {type: 'radio', numOfAlternatives: 4, correctAnswers: [2], required: false, question: 'The city of Kristianstad was founded in 1614 by which Danish king?', alternatives: ['Frederick II', 'Christian III', 'Christian IV', 'Christian V']};
const question5 = {type: 'check', numOfAlternatives: 6, correctAnswers: [0,3,4], required: false, question: 'Who of the following are famous physicists?', alternatives: ['Isaac Newton', 'Franz Abt', 'Rudolf Bultmann', 'James Clerk Maxwell', 'Wolfgang Pauli', 'Hans Cornelius']};
const qs = [question1, question2, question3, question4, question5];
localStorage.setItem('Default', JSON.stringify(qs));

//Loading of the quiz list:
let myQuizList = ['Default'];
let savedQuizList = JSON.parse(localStorage.getItem('Quiz list'));
myQuizList.concat(savedQuizList);
let quizMenuHTML = '';
for (let i=0; i<myQuizList.length; i++) {
    quizMenuHTML += `<option value="${myQuizList[i]}">${myQuizList[i]}</option>`
}
document.getElementById('quizzes').innerHTML = quizMenuHTML; 


//Loading of the chosen quiz:
quizSelectionForm.addEventListener('submit', function(event) {
    event.preventDefault();

    fullQuizContainer.innerHTML = `
    <h3>Quiz: ${quizChoice.value}</h3>
    <input type="text" class="contact-field" name="first-name" id ="first-name-field" placeholder="First name" required>
    <input type="text" class="contact-field" name="last-name" id="last-name-field" placeholder="Last name" required>
    <input type="text" class="contact-field" name="email" id="email-field" placeholder="E-mail" required>
    <form class="quiz-question-set" id="quiz-form">
        <div id="quiz-question-container"></div>
        <button type="submit" class="submit-button">SUBMIT</button>
    </form>
    <p id="name-error-message"></p>
    <p id="email-error-message"></p>
    <p>* This question must be answered.</p>`;

    let questions = JSON.parse(localStorage.getItem(quizChoice.value));
    let questionsHTML = '';
    
    const form = document.getElementById('quiz-form');
    const firstname = document.getElementById('first-name-field');
    const lastname = document.getElementById('last-name-field');
    const email = document.getElementById('email-field');
    const nameError = document.getElementById('name-error-message');
    const emailError = document.getElementById('email-error-message');

    for (let i=0; i<questions.length; i++) {
        console.log(i);
        switch(questions[i].type) {
            case 'radio':
                questionsHTML += `
                <div class="quiz-question">
                    <p class="quiz-question-text">${questions[i].question}</p>`;
                for (let j=0; j<questions[i].alternatives.length; j++) {
                    questionsHTML += `
                    <div class="quiz-radio-alternative-set">
                        <input type="radio" id="question-${i}-${j}" name="question-${i}" value=${questions[i].alternatives[j]}>
                        <label for="question-${i}-${j}" class="quiz-question-alternative-text">${questions[i].alternatives[j]}</label>
                    </div>`;
                }
                questionsHTML += '</div>';    
                break;
            case 'check':
                questionsHTML += `
                <div class="quiz-question">
                    <p class="quiz-question-text">${questions[i].question}</p>`;
                for (let j=0; j<questions[i].alternatives.length; j++) {
                    questionsHTML += `
                    <div class="quiz-radio-alternative-set">
                        <input type="checkbox" id="question-${i}-${j}" name="question-${i}-${j}" value=${questions[i].alternatives[j]}>
                        <label for="question-${i}-${j}" class="quiz-question-alternative-text">${questions[i].alternatives[j]}</label>
                    </div>`;
                }
                questionsHTML += '</div>';    
                break;
            case 'text':
                questionsHTML += `
                <div class="quiz-question">
                    <p class="quiz-question-text">${questions[i].question}</p>
                    <div class="quiz-radio-alternative-set">
                        <input type="text" id="question-${i}" name="question-${i}" class="quiz-text-input">
                    </div>
                </div>`
                break;            
        }
    }
    document.getElementById('quiz-question-container').innerHTML = questionsHTML;
});



form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!email.value.includes('@') || !email.value.includes('.')) {
        emailError.textContent = "You need to provide a proper e-mail address!";
    }
    else {
        emailError.textContent = "";
    }

    if (containsNonLetters(firstname.value) || containsNonLetters(lastname.value)) {
        nameError.textContent = "Only letters (a-ö) are allowed for the first and last names!";
    }
    else {
        nameError.textContent = "";
    }

    let score = 0;

    for (let i=0; i<questions.length; i++) {
        switch (questions[i].type) {
            case 'radio':
                console.log('Question '+i+' is of type radio.');
                for (let j=0; j<questions[i].numOfAlternatives; j++) {
                    let answerString = 'question-'+i+'-'+j;
                    let answer = document.getElementById(answerString).checked;
                    console.log('Answer: '+answer);
                    if (answer === true && questions[i].correctAnswers[0] === j) {
                        score++;
                        break;
                    }
                }
                break;
            case 'check':
                console.log('Question '+i+' is of type check.');
                for (let j=0; j<questions[i].numOfAlternatives; j++) {
                    let answerString = 'question-'+i+'-'+j;
                    let answer = document.getElementById(answerString).checked;
                    if (answer === true) {
                        if (questions[i].correctAnswers.includes(j))
                            score+=0.25;
                        else
                            score-=0.25;
                    }
                }
                break;
            case 'text':
                console.log('Question '+i+' is of type text.');
                let answerString = 'question-'+i;
                let answer = document.getElementById(answerString).value;
                console.log('Answer: '+answer.toLowerCase());
                console.log('Correct answer: '+questions[i].correctAnswers[0]);
                if (answer.toLowerCase() === questions[i].correctAnswers[0])
                    score+=1;
        }
    }

    console.log('Score: '+score);
});