window.onload = init;

function init() {
    let submitted = false;
    document.getElementById('Submit').addEventListener('click', clearForm);
    document.getElementById('Submit').addEventListener('click', submitForm);

}

function clearForm(e) {
    const divElement = document.querySelector('.results')
    divElement.innerHTML = '';
}
/* If item is over 10 an*/
function submitForm(e) {
    var values = [];
    var warnings = [];
    var age = document.getElementsByName('age'); //returns a node list
    age.forEach(function(age) {
        if (age.checked == true) {

            values.push(parseInt(age.value));
            if(age.value >= 10){
                warnings.push(age.name);
                console.log(warnings)
            }
        }
    });
    var diet = document.getElementsByName('diet'); //returns a node list
    diet.forEach(function(diet) {
        if (diet.checked == true) {

            values.push(parseInt(diet.value));
            if(parseInt(diet.value) >= 10){
                warnings.push(diet.name);
                console.log(warnings)

            }

        }
    });

    var family = document.getElementsByName('family'); //returns a node list
    family.forEach(function(element) {
        if (element.checked == true) {

            values.push(parseInt(element.value));
            if(parseInt(family.value) >= 10){
                warnings.push(family.name);
                console.log(warnings)

            }
        }
    });

    var bmi = document.getElementsByName('bmi'); //returns a node list
    bmi.forEach(function(element) {
        if (bmi.checked == true) {
            if(parseInt(bmi.value) >= 10){
                warnings.push(bmi.name);
                console.log(warnings)
            }

        }
    });

    function getSum(total, num) {
        return total + num;
    }

    let number = values.reduce(getSum);
    displayResults(number, warnings);





    console.log(values);
    e.preventDefault();
}




/* THIS NEEDS TO TAKE THE WARNING STRING AS A PARAMETER YOU DONT NEED THE SECOND FUNCTION*/
function displayResults(number, warnings) {
   var warningText =' ';
   console.log(warnings + 'hello');

    const divElement = document.querySelector('.results');

    const results = document.createElement("h2");
    // give it a className
    results.className = "results-message";
    if(number >= 25){  warningText = warnings.join(', ')
    }
    //appendChild (the task input value to the const li)
    var text = document.createTextNode(number);
    results.appendChild(text);

    divElement.appendChild(results);

}
