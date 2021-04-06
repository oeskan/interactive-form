// focus on the name field, put in function later
const nameInput = document.querySelector('#name');
nameInput.focus();

// job role, put in function later
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

//t-shirt info, put in function later
const design = document.querySelector('#design');
const color = document.querySelector('#color')
color.disabled = true;
design.addEventListener ('change', (e) => {
    color.disabled = false;
    for (let i = 0; i < color.children.length; i++) { 
        const eventValue = e.target.value; 
        const currentOption = color.children[i];
        const currentDataTheme = currentOption.getAttribute('data-theme');
           if (eventValue === currentDataTheme) {
            currentOption.hidden = false; //hides from the list
            currentOption.setAttribute('selected', 'selected'); //the one which is shown by default in the list
          } else {
            currentOption.hidden = true;
            currentOption.removeAttribute('selected');
            }
    }
})

//register for activities, put in function later
const activities = document.querySelector('#activities');
const activitiesTotal = document.querySelector('#activities-cost');
let totalCost = 0;

activities.addEventListener ('change', (e) => {
let eventCost = +e.target.getAttribute('data-cost'); // turns it into a number
 if (e.target.checked) {
    totalCost += eventCost;
 } else {
    totalCost -= eventCost;
 }
 activitiesTotal.innerHTML = `<p id="activities-cost" class="activities-cost">Total: $${totalCost}</p>`
})


