/* https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149 */

window.onload = init;
// runs  functions on window load


// for each loop is going to be more effcient here
function init() {
    document.getElementById('userInfo').onsubmit = processForm;

    /* USE A FOREACH LOOP HERE*/
    document.getElementById('first-name').onfocus = clearError;
    document.getElementById('second-name').onfocus = clearError;
    document.getElementById('email').onfocus = clearError;
    document.getElementById('health-authority').onfocus = clearError;

    document.getElementById('first-name').onblur = validateFirstName;
    document.getElementById('second-name').onblur = validateSecondName;
    document.getElementById('email').onblur = validateEmail;
    document.getElementById('health-authority').onblur = validateHealthAuthority;


}

function processForm() {
    console.log('hello');
    var firstName = validateFirstName();
    var lastName = validateSecondName();
    var email = validateEmail();
    validateEmail();
    if(firstName == true){
        console.log('x is true');
    }
    if(lastName == true){
        console.log('y is true');
    }
    return false;
}


function clearError() {

    // clears element if it was an error Only on focus
    document.getElementById(this.id + 'error').innerHTML = "&nbsp;";
    // clears submit error span
    document.getElementById('SubmitError').innerHTML = "&nbsp;";

}


function validateFirstName() {
    var defaultText = "Enter your name.";
    var valid = true;
    var firstName = document.getElementById('first-name').value;
    console.log(firstName);
    var re = new RegExp(/^[a-z ,.'-]+$/i);
    if (re.test(firstName) && (firstName !== defaultText)) {
    return valid;
} else {
     document.getElementById('first-nameerror').innerHTML = 'error in the name field';
    return valid = false;
}

}


function validateSecondName() {
    var valid = true;
    var secondName = document.getElementById('second-name').value;

    console.log(secondName);
    var re = new RegExp(/^[a-z ,.'-]+$/i);
    if (re.test(secondName)) {
        return valid;
    } else {
         document.getElementById('second-nameerror').innerHTML = 'error in the email field';
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
    /* https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149 */
    var re = new RegExp(/[^@]+@[^\.]+\..+/);
    if (re.test(email)) {
        return valid;
    } else {
         document.getElementById('emailerror').innerHTML = 'error in the name field';
        return valid = false;
    }
}

function validateHealthAuthority(){
    var valid = true;
    var healthAuthority = document.getElementById('health-authority');
    var re = new RegExp(/^\d{7}(?:\d{2})?$/);
    if (re.test(healthAuthority)) {
        return valid;
    } else {
         document.getElementById('health-authorityerror').innerHTML = 'error in the health field';
        return valid = false;
    }

}



function hint() {
var defaultText = "Enter your name.";
var txtElem = document.getElementById("first-name");
txtElem.value = defaultText;
txtElem.style.color = "#A8A8A8";
txtElem.style.fontStyle = "italic";


txtElem.onfocus = function() {
 if (input.value === defaultText) {
   input.value = "";
   input.style.color = "#000";
   input.style.fontStyle = "normal";
 }
}
txtElem.onblur = function() {
 if (input.value === "") {
   input.value = defaultText;
   input.style.color = "#A8A8A8";
   input.style.fontStyle = "italic";
 }
}
}
