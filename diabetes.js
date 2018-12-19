// call init function on window load
window.onload = init;

/* This functions loads the event listeners, listening for a click on a form button which will call clear form and submit form.
Clear form is called first in case there is still an input in the 'results' div. Then the submit form function is called */
function init() {
    document.getElementById('Submit').addEventListener('click', clearForm);
    document.getElementById('Submit').addEventListener('click', submitForm);
    openListItems();
}
/* clears the results form. It's called on every click of the 'calculate button' */
function clearForm(e) {
    const divElement = document.querySelector('.results')
    divElement.innerHTML = '';
}
/*  the submitForm function takes the values from the radio button form add adds them to two arrays - 'values' and 'warnings' */
function submitForm(e) {
    var values = []; // instantiate value array
    var warnings = []; // instantiate warning array
    var age = document.getElementsByName('age'); //returns a node list of all items with name 'age'
    age.forEach(function(element) { // loop through each element in the node list
        if (element.checked == true) { // if the element is checked
            values.push(parseInt(element.value)); // push the value assigned to the radio button
            if (element.value >= 10) { // if greater or equal to 10 push the element NAME into the warning array.
                warnings.push(element.name);
            }
        }
    });
    /* each section of the radio button form is dealt with in the same way as above. The selected value is added
    to the array. If over 10 the name is added to the warning array */
    var diet = document.getElementsByName('diet'); //returns a node list of all items with name 'diet'
    diet.forEach(function(element) { // loop through each element in the node list
        if (element.checked == true) {
            values.push(parseInt(element.value));
            if (element.value >= 10) {
                warnings.push(element.name);
            }
        }
    });

    var family = document.getElementsByName('family');
    family.forEach(function(element) {
        if (element.checked == true) {
            values.push(parseInt(element.value));
            if (element.value >= 10) {
                warnings.push(element.name);
            }
        }
    });

    var bmi = document.getElementsByName('bmi');
    bmi.forEach(function(element) {
        if (element.checked == true) {
            values.push(parseInt(element.value));
            if (element.value >= 10) {
                warnings.push(element.name);
            }
        }
    });
    /* This function is used by the javascript reduce function to get the sum of the values array  */
    function getSum(total, num) {
        return total + num;
    }
    // assigned to variable number
    var finalNumber = values.reduce(getSum);
    // call function to calculateResults with the finalNumber and warning array as arguments
    calculateResults(finalNumber, warnings);
    // prevent defualt behaviour (ie don't submit the form)
    e.preventDefault();
}

/* This function calculate the results and returns a text string */
function calculateResults(number, warnings) {
    /* set warningText and finalResponse variables to empty strings. */
    var warningText = '';
    var finalResponse = '';
    /* Use a switch case statement that assigns a string to warningText based on the length of the 'warning' array
    which was passed as an argument. This is only performed if the value of the number is OVER 25 */
    if (number > 25) {
        switch (true) {
            case (warnings.length == 1):
                warningText = ' Your main risk factors is your ' + warnings[0] + '.';
                break;

            case (warnings.length == 2):
                warningText = ' Your main risk factors are your ' + warnings[0] + ' and your ' + warnings[1] + '.';
                break;

            case (warnings.length == 3):
                warningText = ' Your main risk factors are your ' + warnings[0] + ', your ' + warnings[1] + ' and your ' + warnings[2] + '.';
                break;

            case (warnings.length == 4):
                warningText = ' Your main risk factors are your ' + warnings[0] + ', your ' + warnings[1] + ', your ' + warnings[2] + ' and your ' + warnings[3] + '.';
                break;
        }
    }
    /* assign the various responses to variables. Response3 concactenates the warningText string. */
    var response = "Your results show that you currently have a low risk of developing diabetes. However, it is important that you maintain a healthy lifestyle in terms of diet and exercise.";

    var response2 = " Your results show that you currently have a medium risk of developing diabetes.";

    var response3 = 'Your results show that you currently have a high risk of developing diabetes.' + warningText +
        'We advise that you contact the Health Authority to discuss your risk factors as soon as you can. Please fill in our contact form and a member of the Health Authority Diabetes Team will be in contact with you.'

    /* The finalResponse is decided by the number which was added as an argument to function using a switch case statement   */
    switch (true) {
        case number <= 15:
            finalResponse = response;
            break;
        case (number >= 16 && number <= 25):
            finalResponse = response2;
            break;
        case number > 25:
            finalResponse = response3;
            break;
    }
    /* call displayResults function with finalResponse as an argument  */
    displayResults(finalResponse);
}

/* This function appends finalResponse below the HTML form */
function displayResults(finalResponse) {
    // assign results div to variable
    var divElement = document.querySelector('.results');
    // create p element
    var results = document.createElement("p");
    // give it a class name
    results.className = "results-message";
    // Create a text node from the final response. Assign to variable
    var text = document.createTextNode(finalResponse);
    //append 'text' - the text node to paragraph - results
    results.appendChild(text);
    // append the paragraph to the div
    divElement.appendChild(results);
}

/* THIS IS A PURELY DECORATIVE FUNCTION */
/* I introduce the form with a simple flexbox list of diabetes factors. A click on a list item enlarges
it */
function openListItems() {
    // select all contentitems.This is now a node list of list items
    var contentitems = document.querySelectorAll('.contentitems');

     // function that toggles classList 'open'. This changes flexgrow property in css
    function toggleOpen(e) {
        this.classList.toggle('open');
    }
    /*addEventListener to EACH list item. Call toggleopen function on click  */
    contentitems.forEach(function(contentitem) {
        contentitem.addEventListener('click', toggleOpen)
    });
}
