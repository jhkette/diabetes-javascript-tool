// Joseph Ketterer
window.onload = start;

function start() {
    var firstName = document.getElementById('first-name');
    var email = document.getElementById('email');

    nameHint(firstName, 'Enter your name');
    nameHint(email, 'Enter your email');
    switchToolTip(); // tooltip loaded

  /* document.querySelectorAll returns a NodeList which does have the forEach mothod, which is why I am using it here.
  getelementbyClassName returns a HTMLCollection object which is less useful in this instance  */
   fields = document.querySelectorAll('.input-text');
   fields.forEach(function(element){
       element.onblur = function(){
           var field = this;
           var id = this.id;
           validateField(field, id);
       };
   });

    fields = document.querySelectorAll('.input-text');
    fields.forEach(function(element) {
        element.onfocus = function() {
            var field = this; // check if this is needed
            var id = this.id;
            clearError(id);
            removeRedError(field);
        };
    });
    // call processForm function on submit
    document.getElementById('userInfo').onsubmit = processForm;
}


function validateField(field, id) {
    var re = '';
    var defaultText = '';
    var valid = true;

    if (id == 'first-name') {
        re = new RegExp(/^[A-Za-z]{2,}$/i);
        defaultText = 'This is not a valid first name';
    }
    if (id == 'second-name') {
        re = new RegExp(/^[a-z][a-z-]+$/i);
        defaultText = 'This is not a valid second name';
    }
    if (id == 'email') {
        re = new RegExp(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/);
        defaultText = 'This is not a valid email';
    }
    if (id == 'health') {
        re = new RegExp(/^(ZHA)(\d{6})$/);
        defaultText = 'This is not a valid ZHA number';
    }
    if (id == 'telephone') {
        re = new RegExp(/^\d{11}$/);
        defaultText = 'This is not a valid telephone number';
    }
    var val = field.value;
    /* first name contain only letters and is at least two charecters long, case insensitive  */
    if (re.test(val)) { // test value against regular expression
        /* Remove initial focus on first name */
        if (id == 'first-name'){
        removeNameFocus();
        }
        /* Remove error background if it exists (maybe add if statement??) */
        return valid; // return valid
    } else {
        document.getElementById(id + 'Error').innerHTML = defaultText;
        /* Remove initial focus on first name */
        removeNameFocus();
        /* Add red error background */
        addRedError(field);
        valid = false; // change valid to false
        return valid;
    }
}

function nameHint(field, message) {

    field.value = message; // add default text and styling
    field.style.color = "#aba9a9";
    field.style.fontStyle = "italic";

    field.addEventListener('focus', function(event) {
        if (this.value == message) {
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }
    });
    field.addEventListener('blur', function(event) {
        if (this.value === "") { // on blur we add default text again if the value is empty
            this.value = message;
            this.style.color = "#aba9a9";
            this.style.fontStyle = "italic";
        }
    });
}


function processForm() {
    event.preventDefault();
    clearAllErrors();
    var valid = true;
    var fields = document.querySelectorAll('.input-text');
    fields.forEach(function(field){
        var id = field.id;
        console.log(id);
        if(id !== 'telephone'){
            if (validateField(field, id) == false) {
                valid = false;
            }
        }
    });
    var telephone = document.getElementById('telephone');
    if (telephone.value !== "") {
        if(validateField(telephone, 'telephone') == false){
        valid = false;
        }
    }
    if (telephone.value == "") {
        removeRedError(telephone);
        }
    console.log(valid);

    if (valid == true) {
        toggleModal();
    } else {
        document.getElementById('submitError').innerHTML = 'There are errors in the form';
    }
}

/* Clear error function which takes the parameter of the 'id' of the form field to add an error messsage beside the
form field. This works as the id of the error fields is the same as the form field but with an added 'Error' at the end */
function clearError(id) {
    document.getElementById(id + 'Error').innerHTML = "&nbsp;";
    document.getElementById('submitError').innerHTML = "&nbsp;";
}


function clearAllErrors() {
    var errors = document.querySelectorAll('Error');
    errors.forEach(function(error){
        error.innerHTML = "&nbsp;";
    });

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
