window.onload = init;
// runs  functions on window load


// for each loop is going to be more effcient here
function init() {
    document.getElementById('userInfo').onsubmit = processForm;
    document.getElementById('first-name').onfocus = clearError;
    document.getElementById('second-name').onfocus = clearError;

    //document.getElementById('email').onblur = clearError;

}

function processForm() {
    console.log('hello');
    validateFirstName();
    validateSecondName();
    validateEmail();

    return false;
}


function clearError() {

    // clears element if it was an error Only on focus
    document.getElementById(this.id + 'error').innerHTML = "&nbsp;";
    // clears submit error span
    document.getElementById('SubmitError').innerHTML = "&nbsp;";
    document.getElementById('result').innerHTML = "&nbsp;";

}


function validateFirstName() {

    var valid = true;
    var firstName = document.getElementById('first-name').value;
    var re = new RegExp(/^[a-z ,.'-]+$/i);
    if (re.test(firstName)) {
    console.log("Valid");
} else {
    console.log("Invalid");
}

}


function validateSecondName() {
    var valid = true;
    var secondName = document.getElementById('second-name').value;
    console.log(secondName);
    var re = new RegExp(/^[a-z ,.'-]+$/i);
    if (re.test(secondName)) {
    console.log("Valid");
} else {
    console.log("Invalid");
}

}

function validateEmail() {
    var valid = true;
    var email = document.getElementById('email').value;
    var re = new RegExp(/[^@]+@[^\.]+\..+/);
    if (re.test(email)) {
    console.log("Valid");
} else {
    console.log("Invalid");
}



}
