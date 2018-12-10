window.onload = start;

function start() {
  init() ;
  /*With the placeholder text, we are adding/removing several pieces of
  text based on the user input/validation. The programme needs to have a clear sequence for it to
 run correctly. First I am calling the 'hint', which needs to be presented on page load, this function
 then call the validate or clearError functions based on user input.
   */
  firstNameHint();
  secondNameHint();

  /* you are also going to need to change the background color of the first name part of the conctact form  */
}

// runs  functions on window load


// for each loop is going to be more effcient here
function init() {
    /*YOU DON"T NEED ALL THESE */
    document.getElementById('userInfo').onsubmit = processForm;
    document.getElementById('email').onfocus = clearError;
    document.getElementById('health-authority').onfocus = clearError;
    document.getElementById('email').onblur = validateEmail;
    document.getElementById('health-authority').onblur = validateHealthAuthority;

}

function processForm() {

    var firstName = validateFirstName();
    var lastName = validateSecondName();
    var email = validateEmail();

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
    document.getElementById('first-nameerror').innerHTML = "&nbsp;";
    document.getElementById('second-nameerror').innerHTML = "&nbsp;";
    // clears submit error span
    document.getElementById('SubmitError').innerHTML = "&nbsp;";

}


function validateFirstName() {

   var defaultText = "Enter your name.";
    var valid = true;
    var firstName = document.getElementById('first-name').value;
    console.log(firstName);
    /* first name contain only letters and is at least two charecters long  */
    var re = new RegExp(/^[a-z]{2,}$/i);
    if (re.test(firstName) &&( firstName !== defaultText)) {
        console.log('REG EX WORKED')
    return valid;
} else {
     document.getElementById('first-nameerror').innerHTML = 'error in the name field';
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
    if (re.test(secondName) &&( secondName !== defaultText)) {
        return valid;
    } else {
         document.getElementById('second-nameerror').innerHTML = 'error in the email field';
         secondNameHint()
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

    clearError();
  }
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
