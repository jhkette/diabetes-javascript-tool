window.onload = init;
// runs  functions on window load


// for each loop is going to be more effcient here
function init() {
    document.getElementById('userInfo').onsubmit = processForm;

    /* USE A FOREACH LOOP HERE*/
    document.getElementById('first-name').onfocus = clearError;
    document.getElementById('second-name').onfocus = clearError;
    document.getElementById('email').onfocus = clearError;

    document.getElementById('first-name').onblur = validateFirstName;
    document.getElementById('second-name').onblur = validateSecondName;
    document.getElementById('email').onblur = validateEmail;

    

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

    var valid = true;
    var firstName = document.getElementById('first-name').value;
    console.log(firstName);
    var re = new RegExp(/^[a-z ,.'-]+$/i);
    if (re.test(firstName)) {
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
    var re = new RegExp(/[^@]+@[^\.]+\..+/);
    if (re.test(email)) {
        return valid;
    } else {
         document.getElementById('emailerror').innerHTML = 'error in the name field';
        return valid = false;
    }
}
