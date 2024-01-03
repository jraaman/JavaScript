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
});