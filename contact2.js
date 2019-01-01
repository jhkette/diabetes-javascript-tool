// Joseph Ketterer
window.onload = start;



function start() {
    firstNameHint('Enter your first name', 'first-name');
    firstNameHint('Enter your email', 'email'); // hints loaded

    loadEventListeners(); // other event listeners loaded
    switchToolTip(); // tooltip loaded
}

/*This function loads all the event listeners needed to complete the contact form  */
function loadEventListeners() {
    var firstNameRe = new RegExp(/^[A-Za-z]{2,}$/i);
    document.getElementById('first-name').addEventListener('blur', function(event){
    validateFirstName('first-name', firstNameRe, 'this is not valid');
    });
    document.getElementById('second-name').addEventListener('blur', function(event){
    validateFirstName('second-name', firstNameRe, 'this is not valid');
    });
    document.getElementById('email').addEventListener('blur', function(event){
    validateFirstName('email', firstNameRe, 'this is not valid');
    });
    document.getElementById('email').addEventListener('blur', function(event){
    validateFirstName('email', firstNameRe, 'this is not valid');
    });




    fields = document.querySelectorAll('.input-text');
    fields.forEach(function(element){
        element.onfocus = function() {
            var id = this.id;
            clearError(id);
        };
    });

    // call processForm function on submit
    document.getElementById('userInfo').onsubmit = processForm;

}

/* This function processes form. It's called on form submission */
function processForm() {
    /* assign validation functions to variable */
    var firstNameRe = new RegExp(/^[A-Za-z]{2,}$/i);
    var secondNameRe = new RegExp(/^[A-Za-z]{2,}$/i);
    var message = 'this is not a valid first name';

    var secondName = validateFirstName('last-name', secondNameRe);

    /* if statement to check validation functions return true (ie fields are valid) */
    if (firstName == true) {
        /* call modal if all true */
        toggleModal();
        return false; // stop form submitting
    } else {
        /* add error message below form */
        document.getElementById('submitError').innerHTML = 'There are errors in the form';
        return false; // stop form submitting
    }
}

/* Clear error function which takes the parameter of the 'id' of the form field to add an error messsage beside the
form field. This works as the id of the error fields is the same as the form field but with an added 'Error' at the end */
function clearError(id) {
    document.getElementById(id + 'Error').innerHTML = "&nbsp;";
    document.getElementById('submitError').innerHTML = "&nbsp;";
}


/* This removes the initial 'focus' class on the first name. Is called if the first name is valid
NOTE: certain browsers add default backgrounds to form fields (ie chrome), so browsers defaults have been changed in css */
function removeNameFocus() {
    var firstNameField = document.getElementById('first-name');
    firstNameField.classList.remove('focus');
}

/* This adds a very pale red background to the form if there is an error in the form. It gets called in the validation functions . I feel
these help give feedback to the user  */
function addRedError(field) {
    field.classList.add('backgroundred');
}

/*This removes the red background if the form field is correct. It is called in the validation functions    */
function removeRedError(field) {
    field.classList.remove('backgroundred');
}


/* validate first name uses a regular expression to validate the form. The initial focus on the first name
is removed if valid by calling a function from here or re -added if it still incorrect. There needs to be seperate
valiadtion functions for each input. we can't just loop through all the inputs as we are testing each input against
specific regular expressions. Each function also needs to return a value */
function validateFirstName(id, re, message) {


    var valid = true;
    var firstNameField = document.getElementById(id);

    /* first name contain only letters and is at least two charecters long, case insensitive  */

    if (re.test(firstNameField.value)) { // test value against regular expression
        /* Remove initial focus on first name */
        removeNameFocus();
        /* Remove error background if it exists (maybe add if statement??) */
        removeRedError(firstNameField);
        return valid; // return valid
    } else {
        document.getElementById(id+ 'Error').innerHTML = message;
         /* Remove initial focus on first name */
        removeNameFocus();
        /* Add red error background */
        addRedError(firstNameField);
        valid = false; // change valid to false
        return valid;
    }
}




function firstNameHint(message, id) {
    var defaultText = message; // defualt text to be entered
    var txtElem = document.getElementById(id); //asign field to variable
    txtElem.value = defaultText; // add default text and styling
    txtElem.style.color = "#aba9a9";
    txtElem.style.fontStyle = "italic";

    txtElem.onfocus = function() {
        /* If value equals default text onfocus  - replace with empty string. (ie remove default text) to
        allow user to type into field */
        if (this.value === defaultText) {
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }

        var textElemId = this.id; // assign id of value being operated on to variable
        clearError(textElemId); /*as the user is 'focused' on the form
        we need to call clear error function with id of value as an argument. This removes prior
        error message */
    };
    txtElem.onblur = function() {
        if (this.value === "") { // on blur we add default text again if the value is empty
            this.value = defaultText;
            this.style.color = "#aba9a9";
            this.style.fontStyle = "italic";
        }
        var re = new RegExp(/^[A-Za-z]{2,}$/i);
        /* We also need to call the validate function. The user has engaged then
        moved away from the form, so we need to check if the input was valid   */

    };
}




/* Function to add tooltip. I'm changing the opacity on mouseout/mouseover. */
function switchToolTip() {
    document.getElementById('qmark').onmouseover = function() { // when user hovers over question mark...
        var toolTip = document.getElementById('ttip');
        toolTip.style.opacity = 1; // change the opacity of the tooltip to 1
    };
    document.getElementById('qmark').onmouseout = function() { // when the user moves away..
        var toolTip = document.getElementById('ttip');
        toolTip.style.opacity = 0; // change the tooltip opacity to 0
    };
}

/* Function to add a modal popup. It is called if the form is completed correctly
some inspiration taken from here https://sabe.io/tutorials/how-to-create-modal-popup-box */
function toggleModal() {
    var modal = document.querySelector(".modal"); // assign modal class div to vairable
    modal.classList.add("show-modal"); // add class (this changes opacity in css)
    var closeButton = document.querySelector(".close-button"); // assign close button to variable

    closeButton.addEventListener("click", removeModal); // on click call removeModal
    window.addEventListener("click", windowClick); // on click call windowOnClick

    function windowClick(event) {
        /* if the target of the event equals modal, remove modal. The target property gets the element on which the
        event originally occurred, as opposed to the currentTarget property, which always refers to the element whose
        event listener triggered the event.  */
        if (event.target === modal) {
            removeModal();
        }
    }
    /* remove show modal class - this is called on the close button and a click outside window  */
    function removeModal(e) {
        var modal = document.querySelector(".modal");
        modal.classList.remove("show-modal");

    }
}
