window.onload = init;

function init() {
    document.getElementById('Submit').addEventListener('click', submitForm)

}

// function submitForm(e){
//  var age = document.getElementsByName('age'); //returns a node list
//  for (i= 0; i < age.length; i++){
// if(age[i].checked==true){
// console.log(age[i].value);
// console.log('hello');
// }
// }
// e.preventDefault();
// }

function submitForm(e) {
    var values = [];
    var age = document.getElementsByName('age'); //returns a node list
    age.forEach(function(age) {
        if (age.checked == true) {
            console.log(age.value);
            values.push(age.value);
            console.log(values);

        }
    });
    var diet = document.getElementsByName('diet'); //returns a node list
    diet.forEach(function(diet) {
        if (diet.checked == true) {
            console.log(diet.value);
             values.push(diet.value);
                console.log(values);
        }
    });

    var family = document.getElementsByName('family'); //returns a node list
    family.forEach(function(element) {
        if (element.checked == true) {

            values.push(element.value);

                console.log(values);
        }
    });

    var bmi = document.getElementsByName('bmi'); //returns a node list
    bmi.forEach(function(element) {
        if (element.checked == true) {
            values.push(element.value);
            console.log('hello')
        }
    });
console.log(values);
    e.preventDefault();
}
