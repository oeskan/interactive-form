/**
 * Initial focus on the name field when the page loads.
 */
const nameField = document.querySelector('#name');
nameField.focus();

/**
 * Job role. A field is displayed where the user can enter other
 * relevant job role only if "other" job role is selected.
 */
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

/**
 * T-shirt info. Initially hides color options. Listens for a
 * change event when a design is chosen. Loops, selects and 
 * displays only matching theme-specific colors.
 */
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
            currentOption.hidden = false;
            currentOption.setAttribute('selected', '');
        } else {
            currentOption.hidden = true;
            currentOption.removeAttribute('selected');
        }
    }
})

/**
 * Activities. Listens for change event when an activity checkbox is either checked or 
 * unchecked and adds or removes the cost of that event to/from the total cost. Using
 * a loop the user is prevented from selecting simultaneously occuring activites.
 */
const activities = document.querySelector('#activities');
const activitiesTotal = document.querySelector('#activities-cost');
let totalCost = 0;

activities.addEventListener('change', (e) => {
    let eventCost = +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        totalCost += eventCost;
    } else {
        totalCost -= eventCost;
    }
    activitiesTotal.innerHTML = `<p id="activities-cost" class="activities-cost">Total: $${totalCost}</p>`

    for (let i = 0; i < checkboxes.length; i++) {
        const activity = checkboxes[i].getAttribute('data-day-and-time');
        const dateAndTime = e.target.getAttribute('data-day-and-time');
        if (dateAndTime === activity && e.target !== checkboxes[i]) {
            if (e.target.checked) {
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;

            }
        }
    }
})

/**
 * Two event listeners that either adds or removes focus state for
 * the activities section when navigating it using tab. For accessibility.
 */
const checkboxes = document.querySelectorAll("input[type='checkbox']");
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('focus', (e) => {
        checkboxes[i].parentNode.classList.add('focus');
    })
    checkboxes[i].addEventListener('blur', (e) => {
        checkboxes[i].parentNode.classList.remove('focus');
    })
}

/**
 * Payment info. Displays and selects credit card by default. Listens to a change
 * event to either display or hide the credit card, paypal or bitcoin options.
 */
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

/**
 * Validation
 */
const form = document.querySelector('form');
const email = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

/**
 * Helper function that changes the style when not valid and displays a hint.
 * @param {object} parent - parent element of respective field.
 */
function notValid(parent) {
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.style.display = 'block';
}

/**
 * Helper function that changes the style when valid and hides the hint.
 * @param {object} parent - parent element of respective field.
 */
function isValid(parent) {
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = 'none';
}

/**
 * Validates name and invokes either helper function.
 * @return boolean false if name is not valid.
 */
function nameValidation() {
    const regex = /^.*(?!\s*$)/
    const nameValid = regex.test(nameField.value);
    const parent = nameField.parentElement;
    if (nameValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

/**
 * Validates e-mail and invokes either helper function.
 * @return boolean false if e-mail is not valid.
 */
function emailValidation() {
    const regex = /^[A-Za-z0-9\.]+@[A-Za-z0-9\.]+\.com$/
    const emailValid = regex.test(email.value);
    const parent = email.parentElement;
    if (emailValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

/**
 * Validates that activity is selected and invokes either helper function.
 * @return boolean false if no activity is selected.
 */
function activitiesValidation() {
    if (totalCost == 0) {
        notValid(activities);
        return false;
    } else {
        isValid(activities);
    }
}

/**
 * Validates card number length and invokes either helper function.
 * @return boolean false if the amount of digits is not correct.
 */
function cardNumberValidation() {
    const regex = /^\d{13,16}$/
    const cardNumberValid = regex.test(cardNumber.value);
    const parent = cardNumber.parentElement;
    if (cardNumberValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

/**
 * Validates zip number length and invokes either helper function.
 * @return boolean false if the amount of digits is not correct.
 */
function zipValidation() {
    const regex = /^\d{5}$/
    const zipValid = regex.test(zip.value);
    const parent = zip.parentElement;
    if (zipValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

/**
 * Validates cvv number length and invokes either helper function.
 * @return boolean false if the amount of digits is not correct.
 */
function cvvValidation() {
    const regex = /^\d{3}$/
    const cvvValid = regex.test(cvv.value);
    const parent = cvv.parentElement;

    if (cvvValid === false) {
        notValid(parent);
        return false;
    } else {
        isValid(parent);
    }
}

/**
 * Real-time validation
 */
 nameField.addEventListener('keyup', nameValidation);
 email.addEventListener('keyup', emailValidation);
 activities.addEventListener('keyup', activitiesValidation);
 cardNumber.addEventListener('keyup', cardNumberValidation);
 zip.addEventListener('keyup', zipValidation);
 cvv.addEventListener('keyup', cvvValidation);

/**
 * Event listener that prevents form from submitting if any
 * validation has not cleared.
 */
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