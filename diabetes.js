window.onload = init;

function init() {
    document.getElementById('Submit').addEventListener('click', clearForm);
    document.getElementById('Submit').addEventListener('click', submitForm);

    //displayResults(submitForm)


}

function clearForm(e) {
    const divElement = document.querySelector('.results')
    divElement.innerHTML = '';
}

function submitForm(e) {
    var values = [];
    var age = document.getElementsByName('age'); //returns a node list
    age.forEach(function(age) {
        if (age.checked == true) {

            values.push(parseInt(age.value));


        }
    });
    var diet = document.getElementsByName('diet'); //returns a node list
    diet.forEach(function(diet) {
        if (diet.checked == true) {

            values.push(parseInt(diet.value));

        }
    });

    var family = document.getElementsByName('family'); //returns a node list
    family.forEach(function(element) {
        if (element.checked == true) {

            values.push(parseInt(element.value));


        }
    });

    var bmi = document.getElementsByName('bmi'); //returns a node list
    bmi.forEach(function(element) {
        if (element.checked == true) {
            values.push(parseInt(element.value));

        }
    });


    e.preventDefault();
    console.log(values);

    function getSum(total, num) {
        return total + num;
    }
    let number = values.reduce(getSum);

    displayResults(number)
    return number;

}

var number = submitForm;

console.log(number);


// console.log(values);


function displayResults(x) {

    const divElement = document.querySelector('.results');
    const results = document.createElement("h2");
    // give it a className
    results.className = "results-message";
    //appendChild (the task input value to the const li)
    var text = document.createTextNode(x);
    results.appendChild(text);
    divElement.appendChild(results);

}
