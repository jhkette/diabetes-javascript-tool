window.onload = init;

function init() {
    document.getElementById('submit').onsubmit = submitForm();

}

function submitForm(){
// var age = document.getElementsByName('age'); //returns a node list
// for (i=0; i < age.length; i++) {
//             if (age[i] == age[i].checked) {
//             console.log(age[i].input.value);
//         }
//     }

console.log('hello');
return false;
}
