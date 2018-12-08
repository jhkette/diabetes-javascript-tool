window.onload = init;
// runs  functions on window load



function init() {
    document.getElementById('userInfo').onsubmit =  processForm

}

function processForm(){
    console.log('hello');
    return false;
}
