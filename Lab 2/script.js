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

const form = document.getElementById('quiz-form');
const firstname = document.getElementById('first-name-field');
const lastname = document.getElementById('last-name-field');
const email = document.getElementById('email-field');
const nameError = document.getElementById('name-error-message');
const emailError = document.getElementById('email-error-message');

const question11 = document.getElementById('question-1-1');
const question12 = document.getElementById('question-1-2');
const question13 = document.getElementById('question-1-3');
const question14 = document.getElementById('question-1-4');

const question1 = {type: 'radio', numOfAlternatives: 4, correctAnswers: [0]};
const question2 = {type: 'check', numOfAlternatives: 6, correctAnswers: [0,2,4]};
const question3 = {type: 'text', numOfAlternatives: 0, correctAnswers: ["tetris"]};
const question4 = {type: 'radio', numOfAlternatives: 4, correctAnswers: [2]};
const question5 = {type: 'check', numOfAlternatives: 4, correctAnswers: [0,3,4]};
const questions = [question1, question2, question3, question4, question5];

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