// Joseph Ketterer
window.onload = start;

function start() {
    nameHint('first-name', 'Enter your first name');
    nameHint('email', 'Enter your email');
    switchToolTip(); // tooltip loaded


    var firstNameRe = new RegExp(/^[A-Za-z]{2,}$/i);
    var healthRe = new RegExp(/^(ZHA)(\d{6})$/);
    var telephoneRe = new RegExp(/^\d{11}$/);
    var emailRe = new RegExp(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/);

    var secondName = document.getElementById('second-name').addEventListener('blur', function(event) {
        validateField('second-name', firstNameRe, 'this is not valid');
    });

    var health = document.getElementById('health');
    health.addEventListener('blur', function(event) {
        validateField('health', healthRe, 'this is not valid');
    });


    var telephone = document.getElementById('telephone');
    telephone.addEventListener('blur', function(event) {
        validateField('telephone', telephoneRe, 'this is not valid');
    });


    fields = document.querySelectorAll('.input-text');
    fields.forEach(function(element) {
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
    var reSecondName = new RegExp(/^[a-z][a-z-]+$/i);
    var healthRe = new RegExp(/^(ZHA)(\d{6})$/);
    var telephoneRe = new RegExp(/^\d{11}$/);
    var emailRe = new RegExp(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/);
    var firstName = validateField('first-name', firstNameRe, 'error');
    var lastName = validateField('second-name', reSecondName, 'error');
    var email = validateField('email', emailRe, 'error');
    var health = validateField('health', healthRe, 'error');

    /* if statement to check validation functions return true (ie fields are valid) */
    if ((firstName == true) && (lastName == true) && (email == true) && (health == true)) {
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
function validateField(id, re, message) {
    var valid = true;
    var field = document.getElementById(id);
    /* first name contain only letters and is at least two charecters long, case insensitive  */
    if (re.test(field.value)) { // test value against regular expression
        /* Remove initial focus on first name */
        removeNameFocus();
        /* Remove error background if it exists (maybe add if statement??) */
        removeRedError(field);
        return valid; // return valid
    } else {
        document.getElementById(id + 'Error').innerHTML = message;
        /* Remove initial focus on first name */
        removeNameFocus();
        /* Add red error background */
        addRedError(field);
        valid = false; // change valid to false
        return valid;
    }
}

function nameHint(id, message) {

    var defaultText = message; // defualt text to be entered
    var txtElem = document.getElementById(id); //asign field to variable

    txtElem.value = defaultText; // add default text and styling
    txtElem.style.color = "#aba9a9";
    txtElem.style.fontStyle = "italic";

    txtElem.addEventListener('focus', function(event) {
        if (this.value == defaultText) {
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }
    });
    txtElem.addEventListener('blur', function(event) {
        if (this.value === "") { // on blur we add default text again if the value is empty
            this.value = defaultText;
            this.style.color = "#aba9a9";
            this.style.fontStyle = "italic";
        }
        var re = new RegExp(/^[A-Za-z]{2,}$/i);
        var reEmail = new RegExp(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/);
        if (id == 'first-name') {
            validateField('first-name', re, 'not valid');
        }
        if (id == 'email') {
            validateField('email', reEmail, 'not a valid email');
        }

    });
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
