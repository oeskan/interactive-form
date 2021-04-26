// focus on the name field
const nameField = document.querySelector('#name');
nameField.focus();


// job role
const jobRole = document.querySelector('#title');
const otherRole = document.querySelector('#other-job-role');
otherRole.style.display = 'none';
jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherRole.style.display = '';
    } else {
        otherRole.style.display = 'none';
    }
});

//t-shirt info
const design = document.querySelector('#design');
const color = document.querySelector('#color')
color.disabled = true;
design.addEventListener('change', (e) => {
    color.disabled = false;
    for (let i = 0; i < color.children.length; i++) {
        const eventValue = e.target.value;
        const currentOption = color.children[i];
        const currentDataTheme = currentOption.getAttribute('data-theme');
        if (eventValue === currentDataTheme) {
            currentOption.hidden = false; //hides from the list
            currentOption.setAttribute('selected', ''); //the one which is shown by default in the list, any value means true.
        } else {
            currentOption.hidden = true;
            currentOption.removeAttribute('selected');
        }
    }
})

//register for activities
const activities = document.querySelector('#activities');
const activitiesTotal = document.querySelector('#activities-cost');
let totalCost = 0;

activities.addEventListener('change', (e) => {
    let eventCost = +e.target.getAttribute('data-cost'); // turns it into a number
    if (e.target.checked) {
        totalCost += eventCost;
    } else {
        totalCost -= eventCost;
    }
    activitiesTotal.innerHTML = `<p id="activities-cost" class="activities-cost">Total: $${totalCost}</p>`
})

// payment info
const paymentOptions = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

payPal.hidden = true;
bitcoin.hidden = true;
paymentOptions.children[1].setAttribute('selected', '');

paymentOptions.addEventListener('change', (e) => {
    const paymentValue = e.target.value;
    if (paymentValue === creditCard.id) {
        creditCard.hidden = false;
        payPal.hidden = true;
        bitcoin.hidden = true;
    } else if (paymentValue === payPal.id) {
        payPal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;
    } else if (paymentValue === bitcoin.id) {
        bitcoin.hidden = false;
        creditCard.hidden = true;
        payPal.hidden = true;
    }
})

//form validation inside the event listener which calls the helper functions. If false, preventsDefault, otherwise moves on to next text.
const form = document.querySelector('form');
const email = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

function nameValidation() {
    const nRegex = /^.*(?!\s*$)/ //just name "regex" later in fuction as function scope
    const nameValid = nRegex.test(nameField.value); //matches any character zero or more times, then groups a negative lookahead for 0 or more whitespace that must be in the end, alas alone.
    if (nameValid === false) {
        console.log('One or more characters are needed.');
        return false;
    }
}

function emailValidation() {
    const eRegex = /^[A-Za-z0-9\.]+@[A-Za-z0-9\.]+\.com$/
    const emailValid = eRegex.test(email.value);
    if (emailValid === false) {
        console.log('The email address must be validly formatted.');
        return false;
    }
}

function activitiesValidation() {
    if (totalCost == 0) {
        console.log('Select at least one activity.');
        return false;
    }
}

function cardNumberValidation() {
    const cardNumberRegex = /^\d{13,16}$/
    const cardNumberValid = cardNumberRegex.test(cardNumber.value);
    if (cardNumberValid === false) {
        console.log('Please provide a valid credit card number.')
        return false;
    }
}

function zipValidation() {
    const zipRegex = /^\d{5}$/
    const zipValid = zipRegex.test(zip.value);
    if (zipValid === false) {
        console.log('Please provide a valid zip code.')
        return false;
    }
}

function cvvValidation() {
    const cvvRegex = /^\d{3}$/
    const cvvValid = cvvRegex.test(cvv.value);
    if (cvvValid === false) {
        console.log('Please provide a valid cvv number.')
        return false;
    }
}


form.addEventListener('submit', (e) => {
    if (nameValidation() === false) {
        e.preventDefault();
    }
    if (emailValidation() === false) {
        e.preventDefault();
    }
    if (activitiesValidation() === false) {
        e.preventDefault();
    }
    if (creditCard.hidden === false) {
        if (cardNumberValidation() === false) {
            e.preventDefault();
        }
        if (zipValidation() === false) {
            e.preventDefault();
        }
        if (cvvValidation() === false) {
            e.preventDefault();
        }
    }
}
)





