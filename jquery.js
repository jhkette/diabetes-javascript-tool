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

function loadEventListeners() {
    var email = $( "#email" );
    email.focus(function(){
         email = $(this).id;
         clearError(email);

    });

    var telephone= $( "#telephone" );
    email.focus(function(){
         email = $(this).id;
         clearError(email);

    });
}
