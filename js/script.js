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

function notValid (parent) { //1. is invoked when not valid and changes styles
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.style.display = "block";
}
function isValid (parent) { //2. is invoked when valid and changes styles
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = "none";
}

function nameValidation() {
    const regex = /^.*(?!\s*$)/
    const nameValid = regex.test(nameField.value); //matches any character zero or more times, then groups a negative lookahead for 0 or more whitespace that must be in the end, alas alone.
    const parent = nameField.parentElement; //parent element
    if (nameValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

function emailValidation() {
    const regex = /^[A-Za-z0-9\.]+@[A-Za-z0-9\.]+\.com$/
    const emailValid = regex.test(email.value);
    const parent = email.parentElement; //parent element
    if (emailValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

function activitiesValidation() {
    if (totalCost == 0) {
        notValid(activities);
        return false;
    } else {
        isValid(activities);
    }
}

function cardNumberValidation() {
    const regex = /^\d{13,16}$/
    const cardNumberValid = regex.test(cardNumber.value);
    const parent = cardNumber.parentElement; //parent element
    if (cardNumberValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

function zipValidation() {
    const regex = /^\d{5}$/
    const zipValid = regex.test(zip.value);
    const parent = zip.parentElement; //parent element
    if (zipValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

function cvvValidation() {
    const regex = /^\d{3}$/
    const cvvValid = regex.test(cvv.value);
    const parent = cvv.parentElement; //parent element

    if (cvvValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

//the event listener which starts it all.
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

//accessibility - add/remove focus for the activities section when tabbing through.
const checkboxes = document.querySelectorAll("input[type='checkbox']");
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener ('focus', (e) => {
        checkboxes[i].parentNode.classList.add("focus");
    })
    checkboxes[i].addEventListener ('blur', (e) => {
        checkboxes[i].parentNode.classList.remove("focus");
    })
}




