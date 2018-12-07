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
    console.log(number);
    var warningText = ' ';
    warningText = warnings.join(', ');
    var response = "Your results show that you currently have a low risk of developing diabetes. However, it is important that you maintain a healthy lifestyle in terms of diet and exercise.";

    var response2 = " Your results show that you currently have a medium risk of developing diabetes.";

    var response3 = "Your results show that you currently have a high risk of developing diabetes.";
    var finalResponse ='';

    const divElement = document.querySelector('.results');

    const results = document.createElement("p");

    // give it a className
    results.className = "results-message";

    //appendChild (the task input value to the const li)
    switch (true) {
        case number < 15:
            finalResponse = response;
            //console.log('hello')
            break;
        case (number >= 15 && number <= 30):
            finalResponse = response2;
            //console.log('hello1')
            break;
        case number > 30:
            finalResponse = response3;
            //console.log('hello2')
            break;
    }

    var text = document.createTextNode(finalResponse);
    results.appendChild(text);
    divElement.appendChild(results);
}
