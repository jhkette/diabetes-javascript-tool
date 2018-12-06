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
            if (age.value >= 10) {
                warnings.push(age.name);
                console.log(warnings)
            }
        }
    });
    var diet = document.getElementsByName('diet'); //returns a node list
    diet.forEach(function(element) {
        if (element.checked == true) {

            values.push(parseInt(element.value));
            if (parseInt(element.value) >= 10) {
                warnings.push(element.name);
                console.log(warnings)

            }

        }
    });

    var family = document.getElementsByName('family'); //returns a node list
    family.forEach(function(element) {
        if (element.checked == true) {

            values.push(parseInt(element.value));
            if (parseInt(element.value) >= 10) {
                warnings.push(element.name);
                console.log(warnings)

            }
        }
    });

    var bmi = document.getElementsByName('bmi'); //returns a node list
    bmi.forEach(function(element) {
        if (element.checked == true) {
        values.push(parseInt(element.value));
            if (parseInt(element.value) >= 10) {
                warnings.push(element.name);
                console.log(warnings)
            }

        }
    });

    function getSum(total, num) {
        return total + num;
    }

    let number = values.reduce(getSum);

    displayResults(number, warnings);


    e.preventDefault();
}



function displayResults(number, warnings) {
    var warningText = ' ';


    console.log(warnings);

    const divElement = document.querySelector('.results');

    const results = document.createElement("h2");

    // give it a className
    results.className = "results-message";

    //appendChild (the task input value to the const li)
    var text = document.createTextNode(number);

    results.appendChild(text);


    divElement.appendChild(results);
    if (number > 25) {
    warningText = warnings.join(', ');
    var results2 = document.createElement("h2");
    console.log(warningText);

     var text2 = document.createTextNode(warningText);
     results2.appendChild(text2);
     divElement.appendChild(results2);
}

}
