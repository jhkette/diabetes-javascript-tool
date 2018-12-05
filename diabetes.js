window.onload = init;

function init() {
    document.getElementById('Submit').addEventListener('click', submitForm)

}

function submitForm(e) {
    var values = [];
    var age = document.getElementsByName('age'); //returns a node list
    age.forEach(function(age) {
        if (age.checked == true) {
            console.log(age.value);
            values.push(parseInt(age.value));
            console.log(values);

        }
    });
    var diet = document.getElementsByName('diet'); //returns a node list
    diet.forEach(function(diet) {
        if (diet.checked == true) {
            console.log(diet.value);
             values.push(parseInt(diet.value));
                console.log(values);
        }
    });

    var family = document.getElementsByName('family'); //returns a node list
    family.forEach(function(element) {
        if (element.checked == true) {

            values.push(parseInt(element.value));

                console.log(values);
        }
    });

    var bmi = document.getElementsByName('bmi'); //returns a node list
    bmi.forEach(function(element) {
        if (element.checked == true) {
            values.push(parseInt(element.value));
            console.log('hello')
        }
    });
console.log(values);

    e.preventDefault();


    function getSum(total, num) {
    return total + num;
    }



            const divElement = document.querySelector('.results')
            const results = document.createElement("h2");
            // give it a className
            results.className = "results-message";
            //appendChild (the task input value to the const li)
            var text = document.createTextNode(values.reduce(getSum));
            results.appendChild(text);
            divElement.appendChild(results);


}
