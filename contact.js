window.onload = start;

/* With the placeholder text, we are adding/removing several different pieces of
text based on the user input/validation. The programme needs to have a clear sequence for it to
run correctly. First I am calling the 'hints', which needs to be presented on page load, this function
then calls the validate or clearError functions based on user input. The hint function is then
recalled or it's input removed. The other form inputs are listend for in load event listeners, which also in
turn validate or report errors. */

/* you are also going to need to change the background color of the first name
 part of the conctact form  */
/* load the tooltip function here */

function start() {
    firstNameHint();
    secondNameHint();
    healthHint();
    loadEventListeners();
    switchToolTip();
}

function loadEventListeners() {

    document.getElementById('userInfo').onsubmit = processForm;
    document.getElementById('email').onfocus = clearError;
    document.getElementById('email').onblur = validateEmail;

}


function switchToolTip() {
  document.getElementById('qmark').onmouseover = function() {
  var toolTip = document.getElementById('ttip');
  toolTip.style.display='block';
  }
  document.getElementById('qmark').onmouseout = function() {
  var toolTip = document.getElementById('ttip');
  toolTip.style.display='none';
  }
}



function processForm() {

    var firstName = validateFirstName();
    var lastName = validateSecondName();
    var email = validateEmail();

    if (firstName == true) {
        console.log('x is true');
    }
    if (lastName == true) {
        console.log('y is true');
    }
    return false;
}


function clearError() {

    //clears element if it was an error Only on focus
    document.getElementById('first-nameError').innerHTML = "&nbsp;";
    document.getElementById('second-nameerror').innerHTML = "&nbsp;";
    document.getElementById('health-authorityerror').innerHTML = "&nbsp;";
    document.getElementById('emailError').innerHTML = "&nbsp;";
    // document.getElementById(this.id + 'Error').innerHTML = "&nbsp;";
}





function validateFirstName() {

    var defaultText = "Enter your name.";
    var valid = true;
    var firstName = document.getElementById('first-name').value;
    console.log(firstName);
    /* first name contain only letters and is at least two charecters long, case insensitive  */
    var re = new RegExp(/^[a-z]{2,}$/i);
    if (re.test(firstName)) {
        console.log('REG EX WORKED')
        return valid;
    } else {
        document.getElementById('first-nameError').innerHTML = 'error in the name field';
        firstNameHint()
        return valid = false;
    }
}


function validateSecondName() {
    var defaultText = "Enter your name.";
    var valid = true;
    var secondName = document.getElementById('second-name').value;
    /* second name contains only letters or a hyphen, more thah 2 letters, case insensitive */
    var re = new RegExp(/^[a-z-]{2,}$/i);
    if (re.test(secondName)) {
        return valid;
    } else {
        document.getElementById('second-nameerror').innerHTML = 'error in the email field';
        document.getElementById('second-name').style.border = "thin solid #0000FF";
        secondNameHint();
        return valid = false;
    }
}

function validateEmail() {
    var valid = true;
    var email = document.getElementById('email').value;
    /*does not include @
    does include @
    next charexter does not include a dot
    does include a dot */
    /* https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149   */
    var re = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    if (re.test(email)) {
        return valid;
    } else {
        document.getElementById('emailError').innerHTML = 'error in the name field';

        return valid = false;
    }
}

function validateHealthAuthority() {
    var defaultText = "Health number";
    var valid = true;
    var healthAuthority = document.getElementById('health').value;
    var re = new RegExp(/^zha\d{6}$/i);
    if (re.test(healthAuthority)) {
        return valid;
    } else {
        document.getElementById('health-authorityerror').innerHTML = 'error in the health field';
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
            clearError();
        }

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

// YOU CAN USE THIS HERE to clear error and in error function
function secondNameHint() {
    var defaultText = "Enter your name.";
    var txtElem = document.getElementById("second-name");
    txtElem.value = defaultText;
    txtElem.style.color = "#A8A8A8";
    txtElem.style.fontStyle = "italic";


    txtElem.onfocus = function() {
        // the value being operated on
        if (this.value === defaultText) {
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }
        clearError();
    }
    txtElem.onblur = function() {
        if (this.value === "") {
            this.value = defaultText;
            this.style.color = "#A8A8A8";
            this.style.fontStyle = "italic";
        }
        // user moving away from form field will trigger form validation
        validateSecondName();
    }
}


function healthHint() {
    var defaultText = "Health number.";
    var txtElem = document.getElementById("health");
    console.log(txtElem);
    txtElem.value = defaultText;
    txtElem.style.color = "#A8A8A8";
    txtElem.style.fontStyle = "italic";


    txtElem.onfocus = function() {

        // the value being operated on
        if (this.value === defaultText) {
            console.log('HELLLO')
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }
        clearError();
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
