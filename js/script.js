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
            currentOption.hidden = false;
            currentOption.setAttribute('selected', 'selected');
          } else {
            currentOption.hidden = true;
            currentOption.removeAttribute('selected');
            }
    }
})
