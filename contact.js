window.onload = start;

/* With the placeholder text, we are adding/removing several different pieces of
text based on the user input/validation. The programme needs to have a clear sequence for it to
run correctly. First I am calling the 'hints', which needs to be presented on page load, this function
then calls the validate or clearError functions based on user input. The hint function is then
recalled or it's input removed. The other form inputs are listend for in load event listeners, which also in
turn validate or report errors. */

function start() {
    firstNameHint();
    secondNameHint();
    healthHint();
    loadEventListeners();
    switchToolTip();
}

/*This function loads all the event listeners needed on the contact form  */
function loadEventListeners() {
    var email = document.getElementById('email');
    // anonymous function to call clear error on focus with the id of email as an argument
    email.onfocus = function() {
        email = this.id;
        clearError(email);
    };

    var telephone = document.getElementById('telephone');
    // anonymous function to call clear error on focus with the id of telephone as an argument
    telephone.onfocus = function() {
        telephone = this.id;
        clearError(telephone);
    };

    var title = document.getElementById('title');
    // anonymous function to call clear error on focus with the id of telephone as an argument
    title.onfocus = function() {
        title = this.id;
        clearError(title);
    };

    // on blur events for these fields validate field
    document.getElementById('telephone').onblur = validateTelephone;
    document.getElementById('email').onblur = validateEmail;
    document.getElementById('title').onblur = validateTitle;

    // call processForm function on submit
    document.getElementById('userInfo').onsubmit = processForm;

}

/* This function processes form. It's called on form submission */
function processForm() {
    /* assign validation functions to variable */
    var firstName = validateFirstName();
    var lastName = validateSecondName();
    var title = validateTitle();
    var email = validateEmail();
    var health = validateHealthAuthority();
    /* if statement to check validation functions return true (ie fields are valid) */
    if ((firstName == true) && (lastName == true) && (email == true) && (health == true) && (title == true)) {
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

/* This add a very pale red background to the form if there is an error in the form. It gets called in the validation functions . I feel
these help give feedback to the user  */
function addRedError(field) {
    field.classList.add('backgroundred');
}

/*This removes the red background if the form field is correct. It is called in the validation functions    */
function removeRedError(field) {
    field.classList.remove('backgroundred');
}


/* validate first name uses a regular expression to validate the form. The initial focus on the first name
is removed if valid by calling a function from here or readded if it still incorrect.  */
function validateFirstName() {

    var defaultText = "Enter your name.";
    var valid = true;
    var firstNameField = document.getElementById('first-name');

    /* first name contain only letters and is at least two charecters long, case insensitive  */
    var re = new RegExp(/^[a-z]{2,}$/i);
    if (re.test(firstNameField.value)) { // test value against regular expression
        /* Remove initial focus on first name */
        removeNameFocus();
        /* Remove error background if it exists (maybe add if statement??) */
        removeRedError(firstNameField);
        return valid; // return valid
    } else {
        document.getElementById('first-nameError').innerHTML = 'This is not a valid first name';
         /* Remove initial focus on first name */
        removeNameFocus();
        /* Add red error background */
        addRedError(firstNameField);
        valid = false; // change valid to false
        return valid;
    }
}

/* Function to validate last name. The following validation functions follow the same structure
as the first. They obviously need to be seperate functions, as we are validating different values
against differnt regular expressions. */
function validateSecondName() {
    var defaultText = "Enter your name.";
    var valid = true;
    var secondNameField = document.getElementById('second-name');

    /* last name contain only letters OR letters and '-'. It is at least two charecters long, case insensitive  */
    var re = new RegExp(/^[a-z][a-z-]+$/i);
    if (re.test(secondNameField.value)) {
        removeRedError(secondNameField);
        return valid;
    } else {
        addRedError(secondNameField);
        document.getElementById('second-nameError').innerHTML = 'This is not a valid last name';
        valid = false;
        return valid;
    }
}
/*Function to validate title. The inital selection is an empty string.
This way i'm making the user SELECT a title rather than just add the default selection.
If the value which accords to an empty string
is selected an error is thrown */

function validateTitle(){
    var valid = true;
    var title = document.getElementById('title');
    if(title.value == "") {
        document.getElementById('titleError').innerHTML = 'Enter your title';
        valid = false;
        return valid;
    } else{
        return valid;
    }

}

/* Validate email function */
function validateEmail() {
    var valid = true;
    var emailField = document.getElementById('email');

    /* regular expression: one or more letters or numbers or '_.-', followed by an @ sign. Then the email provider, which is letters,
    numbers, or selected punctuation. Then a dot. Then a domain name which is letters, may contain a dot. Between 2 and 6 chrecters long.
    Then end of string.
    Inspiration from https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149 */
    var re = new RegExp(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/);
    if (re.test(emailField.value)) {
        removeRedError(emailField); // remove red error
        return valid;
    } else {
        addRedError(emailField); // add red error
        document.getElementById('emailError').innerHTML = 'This is not a valid email'; // add error message
        valid = false;
        return valid;
    }
}

/* function to validate telephone */
function validateTelephone() {
    var valid = true;
    var telephoneField = document.getElementById('telephone');
    /* regular expression to match 11 digits. no other chrecters allowed */
    var re = new RegExp(/^\d{11}$/);
    if (re.test(telephoneField.value)) {
        removeRedError(telephoneField);
        return valid;
    } else {
        addRedError(telephoneField);
        document.getElementById('telephoneError').innerHTML = 'This is not a valid telephone number';
        valid = false;
        return valid;
    }
}

/* Function to validate health authority field */
function validateHealthAuthority() {

    var defaultText = "Enter health number.";
    var valid = true;
    var healthField = document.getElementById('health');
    /* regular expression starts with zha and is then followed by 6 digits. case insensitive  */
    var re = new RegExp(/^(zha)(\d{6})$/i);
    if (re.test(healthField.value)) {
        removeRedError(healthField);
        return valid;
    } else {
        addRedError(healthField);
        document.getElementById('healthError').innerHTML = 'This is not a valid Health Authority Number';
        valid = false;
        return valid;
    }
}
/* Function to add a hint to the first name field */
function firstNameHint() {
    var defaultText = "Enter your first name."; // defualt text to be entered
    var txtElem = document.getElementById("first-name"); //asign field to variable
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
        if (this.value === "") { // on blur we readd default text if the value is empty
            this.value = defaultText;
            this.style.color = "#aba9a9";
            this.style.fontStyle = "italic";
        }
        /* We also need to call the validate function. The user has engaged then
        moved away from the form, so we need to check if the input was valid   */
        validateFirstName();
    };
}

/* Function to add a last name hint, this follows the same structure as the first name */
function secondNameHint() {
    var defaultText = "Enter your last name.";
    var txtElem = document.getElementById("second-name");
    txtElem.value = defaultText;
    txtElem.style.color = "#aba9a9";
    txtElem.style.fontStyle = "italic";

    txtElem.onfocus = function() {
        if (this.value === defaultText) {

            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }
        var textElemId = this.id;
        clearError(textElemId);
    };

    txtElem.onblur = function() {
        if (this.value === "") {
            this.value = defaultText;
            this.style.color = "#aba9a9";

            this.style.fontStyle = "italic";
        }
        validateSecondName();
    };
}


/* Function to add a health hint */
function healthHint() {
    var defaultText = "Enter Health Authority Number.";
    var txtElem = document.getElementById("health");
    txtElem.value = defaultText;
    txtElem.style.color = "#aba9a9";
    txtElem.style.fontStyle = "italic";
    txtElem.style.fontFamily = "calibri";
    txtElem.onfocus = function() {

        if (this.value === defaultText) {
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";

        }
        var textElemId = this.id;
        clearError(textElemId);
    };

    txtElem.onblur = function() {
        if (this.value === "") {
            this.value = defaultText;
            this.style.color = "#aba9a9";
            this.style.fontStyle = "italic";
        }
        validateHealthAuthority();
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
