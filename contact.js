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

/*This function loads all the event listeners need on the contact form  */
function loadEventListeners() {
     // anonymous function to call clear error on focus with the id of email as an argument
     var email = document.getElementById('email');
     email.onfocus = function() {
         email = this.id;
         clearError(email);
     };
     // anonymous function to call clear error on focus with the id of telephone as an argument
     var telephone = document.getElementById('telephone');
     telephone.onfocus = function() {
         telephone = this.id;
         clearError(telephone);
     };
   // on blur events for these fields validate field
    document.getElementById('telephone').onblur = validateTelephone;
    document.getElementById('email').onblur = validateEmail;

    // call processForm function on submit
    document.getElementById('userInfo').onsubmit = processForm;

}

/*Function to add tooltip. I'm changing the opacity on mouseout/mouseover.  */
function switchToolTip() {
  document.getElementById('qmark').onmouseover = function() {
  var toolTip = document.getElementById('ttip');
  toolTip.style.opacity= 1;
};
  document.getElementById('qmark').onmouseout = function() {
  var toolTip = document.getElementById('ttip');
  toolTip.style.opacity= 0;
};
}



function processForm() {

    var firstName = validateFirstName();
    var lastName = validateSecondName();
    var email = validateEmail();
    var health = validateHealthAuthority();

    if ((firstName == true) && (lastName == true) && (email == true) && (health == true))  {
        console.log('SUBMIT FORM');
        return false;
    }

    else{
        document.getElementById('submitError').innerHTML = 'There are errors in the form';
     return false;
    }
}

/* Clear error function which takes the parameter of 'id' of the form field to add an error messsage beside the
form field */
function clearError(id) {
    document.getElementById(id + 'Error').innerHTML = "&nbsp;";
    document.getElementById('submitError').innerHTML = "&nbsp;";
}

/* validate first name uses a regular expression to validate the form. The initial focus on the first name
is removed if valid by calling a function from here or readded if it still incorrect. First name hint text is only readded if
the user has added no text. Otherwise error text is left in input field (it may of just been a small typo). The error message by the
field is also added.  */
function validateFirstName() {

    var defaultText = "Enter your name.";
    var valid = true;
    var firstNameField = document.getElementById('first-name');
    var firstName = document.getElementById('first-name').value;
    console.log(firstName);
    /* first name contain only letters and is at least two charecters long, case insensitive  */
    var re = new RegExp(/^[a-z]{2,}$/i);
    if (re.test(firstName)) {
        removeNameFocus();
        removeRedError(firstNameField);
        return valid;
    } else {
        document.getElementById('first-nameError').innerHTML = 'error in the name field';
        removeNameFocus();
        addRedError(firstNameField);

        return valid = false;
    }
}

/* This removes the 'focus' class on the first name. Is called if the first name is valid */
function removeNameFocus(){
    var firstNameField = document.getElementById('first-name');
    firstNameField.classList.remove('focusgreen');
}


/* This add a red background to the form if there is an error. It gets called in the validation functions .  */
function addRedError(field){
     field.classList.add('backgroundred');
}

/*This removes the function if the form is correct. It is called in the validation functions    */
function removeRedError(field){
     field.classList.remove('backgroundred');
}



function validateSecondName() {

    var defaultText = "Enter your name.";
    var valid = true;
    var secondNameField = document.getElementById('second-name');
    var secondName = document.getElementById('second-name').value;
    console.log(secondName);
    /* first name contain only letters and is at least two charecters long, case insensitive  */
    var re = new RegExp(/^[a-z-]{2,}$/i);
    if (re.test(secondName)) {
        removeRedError(secondNameField);
        return valid;
    } else {
        addRedError(secondNameField);
        document.getElementById('second-nameError').innerHTML = 'error in the name field';

        return valid = false;
    }
}

function validateEmail() {
    var valid = true;
    var emailField = document.getElementById('email');
    var email = document.getElementById('email').value;

    /* https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149   */
    var re = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    if (re.test(email)) {
        removeRedError(emailField);
        return valid;
    } else {
        addRedError(emailField);
        document.getElementById('emailError').innerHTML = 'error in the name field';

        return valid = false;
    }
}

function validateTelephone() {
    var valid = true;
    var telephoneField = document.getElementById('telephone');
    var telephone = document.getElementById('telephone').value;

    /* https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149   */
    var re = new RegExp(/^\d{11}$/i);
    if (re.test(telephone)) {
        removeRedError(telephoneField);
        return valid;
    } else {
        addRedError(telephoneField);
        document.getElementById('telephoneError').innerHTML = 'error in the name field';

        return valid = false;
    }
}


function validateHealthAuthority() {


        var defaultText = "Enter health number.";
        var valid = true;
        var healthField = document.getElementById('health');
        var health = document.getElementById('health').value;
        console.log(health);
        /* first name contain only letters and is at least two charecters long, case insensitive  */
        var re = new RegExp(/^zha\d{6}$/i);
        if (re.test(health)) {
            removeRedError(healthField);
            return valid;
        } else {
            addRedError(healthField);
            document.getElementById('healthError').innerHTML = 'error in the name field';

            return valid = false;
        }
    }

function firstNameHint() {
    var defaultText = "Enter your name.";
    var txtElem = document.getElementById("first-name");
    txtElem.value = defaultText;
    txtElem.style.color = "#A8A8A8";
    txtElem.style.fontStyle = "italic";

    txtElem.onfocus = function() {
        //the value being operated on
        if (this.value === defaultText) {

            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }

        textElemId = this.id;
        clearError(textElemId);
    }
    txtElem.onblur = function() {
        if (this.value === "") {
            this.value = defaultText;
            this.style.color = "#A8A8A8";
            this.style.fontStyle = "italic";

        }
        validateFirstName();

    }
}


function secondNameHint() {
    var defaultText = "Enter your name.";
    var txtElem = document.getElementById("second-name");
    txtElem.value = defaultText;
    txtElem.style.color = "#A8A8A8";
    txtElem.style.fontStyle = "italic";

    txtElem.onfocus = function() {
        //the value being operated on
        if (this.value === defaultText) {

            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }
        textElemId = this.id;
        clearError(textElemId);
    }

    txtElem.onblur = function() {
        if (this.value === "") {
            this.value = defaultText;
            this.style.color = "#A8A8A8";

            this.style.fontStyle = "italic";
        }
        validateSecondName();
    }
}



function healthHint() {
    var defaultText = "Health number.";
    var txtElem = document.getElementById("health");
    console.log(txtElem + 'HEALTH');
    txtElem.value = defaultText;
    txtElem.style.color = "#A8A8A8";
    txtElem.style.fontStyle = "italic";
    txtElem.style.fontFamily = "calibri";


    txtElem.onfocus = function() {

        // the value being operated on
        if (this.value === defaultText) {
            console.log('HELLLO health')
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";

        }
        textElemId = this.id;
        clearError(textElemId);

    }

    txtElem.onblur = function() {
        if (this.value === "") {
            this.value = defaultText;
            this.style.color = "#A8A8A8";
            this.style.fontStyle = "italic";
        }
        // user moving away from form field will trigger form validation

        validateHealthAuthority();
    }
}
