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
    var divElement = document.querySelector('.results');
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

/* This function uses the values from the prior function to create a warning string if the number value is over 25. It also assigns a
value to finalResponse.  These are both then passed onto displayresults function - to create a messaged that is appended below the form */
function calculateResults(number, warnings) {
    /* set warningText and finalResponse variables to empty strings. */
    var warningText = '';
    var finalResponse;
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

    /* The finalResponse is assigned a value. This is passed to the final function to assign appropriate text  */
    switch (true) {
        case number <= 15:
            finalResponse = 1;
            break;
        case (number >= 16 && number <= 25):
            finalResponse = 2;
            break;
        case number > 25:
            finalResponse = 3;
            break;
    }
    /* call displayResults function with finalRespons and the warning text as an argument  */
    displayResults(finalResponse, warningText);
}

/* This function creates a div and paragraph and then adds html text to the paragraph with the appropriate response */
function displayResults(finalResponse, warningText) {
    // assign results div to variable
    var divElement = document.querySelector('.results');
    // create p element
    var results = document.createElement("p");
    // give it a class name
    results.className = "results-message";

    /* A switch case statement that adds html to the parapgraph based on the finalResponse value. I'm using innerHTML here as opposed to creating
    a series of textnodes. Because there are links in two of the reponses this would involve creating text nodes for the text, then the link,
    then the subsequent text.
    Using innerHTML in this instance creates shorter more legible code. */
    switch(true){
        case finalResponse == 1:
        results.innerHTML = 'Your results show that you currently have a low risk of developing diabetes. it is important that you maintain a healthy lifestyle in terms of diet and exercise.';
        break;
        case finalResponse == 2:
        results.innerHTML = 'Your results show that you currently have a medium risk of developing diabetes.  For more information on your risk factors, and what to do about them, please visit our diabetes advice website at <a href="https://www.diabetes.org.uk/">http://www.zha.org.zd</a>.';
        break;
        case finalResponse == 3:
        results.innerHTML = 'Your results show that you currently have a high risk of developing diabetes .' + warningText +
            'We advise that you contact the Health Authority to discuss your risk factors as soon as you can. Please fill in our <a href="contact.html">contact</a> form and a member of the Health Authority Diabetes Team will be in contact with you.';
    }

    // append the paragraph to the div
    divElement.appendChild(results);
}

/* This is a function to add a simple effect to the home page */
/* I introduce the form with a flexbox list of diabetes factors. A click on a list item enlarges
it by toggling a class with 'flex grow'*/
function openListItems() {
    // select all contentitems.This is now a node list of list items
    var contentitems = document.querySelectorAll('.contentitems');
    var links = document.querySelectorAll('.summary');

     // function that toggles classList 'open'. This changes flexgrow property in css
    function toggleOpen(e) {

        this.classList.toggle('open');
    }
    /*addEventListener to EACH list item. Call toggleopen function on click  */
    contentitems.forEach(function(contentitem) {
        contentitem.addEventListener('click', toggleOpen);

    });
}
