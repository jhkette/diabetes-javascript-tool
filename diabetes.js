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
    age.forEach(function(element) {
        if (element.checked == true) {

            values.push(parseInt(element.value));
            if (element.value >= 10) {
                warnings.push(element.name);

            }
        }
    });
    var diet = document.getElementsByName('diet'); //returns a node list
    diet.forEach(function(element) {
        if (element.checked == true) {

            values.push(parseInt(element.value));
            if (parseInt(element.value) >= 10) {
                warnings.push(element.name);


            }

        }
    });

    var family = document.getElementsByName('family'); //returns a node list
    family.forEach(function(element) {
        if (element.checked == true) {

            values.push(parseInt(element.value));
            if (parseInt(element.value) >= 10) {
                warnings.push(element.name);


            }
        }
    });

    var bmi = document.getElementsByName('bmi'); //returns a node list
    bmi.forEach(function(element) {
        if (element.checked == true) {
            values.push(parseInt(element.value));
            if (parseInt(element.value) >= 10) {
                warnings.push(element.name);

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
    console.log(warnings);
    console.log(warnings.length);
    var warningText = ' ';


    var finalResponse = '';

   if(number > 25){
        switch (true) {
            case (warnings.length == 1):
                warningText = ' Your main risk factors is your ' + warnings[0]+ '.';
                break;

            case (warnings.length == 2):
                warningText = ' Your main risk factors are your ' + warnings[0] + ' and your ' + warnings[1]+ '.';
                break;

            case (warnings.length == 3):
                warningText = ' Your main risk factors are your ' + warnings[0] + ', your ' + warnings[1] + ' and your ' + warnings[2]+ '.';
                break;

            case (warnings.length == 4):
                warningText = ' Your main risk factors are your ' + warnings[0] + ', your ' + warnings[1] + ', your ' + warnings[2] + ' and your ' + warnings[3] + '.';
                break;
        }
    }


    var response = "Your results show that you currently have a low risk of developing diabetes. However, it is important that you maintain a healthy lifestyle in terms of diet and exercise.";

    var response2 = " Your results show that you currently have a medium risk of developing diabetes.";

    var response3 =  'Your results show that you currently have a high risk of developing diabetes.' + warningText +
    'We advise that you contact the Health Authority to discuss your risk factors as soon as you can. Please fill in our contact form and a member of the Health Authority Diabetes Team will be in contact with you.'

    //appendChild (the task input value to the const li)
    switch (true) {
        case number <= 15:
            finalResponse = response;
            //console.log('hello')
            break;
        case (number >= 16 && number <= 25):
            finalResponse = response2;
            //console.log('hello1')
            break;
        case number > 25:
            finalResponse = response3;
            //console.log('hello2')
            break;
    }
    const divElement = document.querySelector('.results');

    const results = document.createElement("p");

    // give it a className
    results.className = "results-message";

    var text = document.createTextNode(finalResponse);
    results.appendChild(text);
    divElement.appendChild(results);
}
