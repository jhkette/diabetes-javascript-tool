window.onload = init;

function init() {
    document.getElementById('Submit').addEventListener('click', submitForm)

}

function submitForm(e){
 var age = document.getElementsByName('age'); //returns a node list
if(age[1].checked==true){
console.log(age[1].value);
console.log('hello');
}
e.preventDefault();
}
