document.addEventListener("DOMContentLoaded",function(){
   
    fetch("https://api.exchangerate.host/symbols")
    .then(response => response.json())
    .then(data => generateList(data))

    function generateList(data){
        var objects = data.symbols;

        const select = document.querySelector("#fromValue");
        const select2 = document.querySelector("#toValue");

        const submit = document.createElement("input"); //create submit button
        submit.setAttribute("type", "submit");

        const labelFrom = document.querySelector("#labelFrom");
        const labelTo = document.querySelector("#labelTo");
        const form = document.querySelector("form");
        const container = document.querySelector("#conversion");

        for (const key in objects) {
            var text = objects[key].description;
            var code = objects[key].code;
 
            var option = generateOption(text, code);
            var option2 = generateOption(text, code);
 
            select.appendChild(option);
            select2.appendChild(option2);
           }
    }

    function generateOption(text, value){
        const option = document.createElement("option");
        option.text = text;
        option.value = value;
        return option;
    }

       
    document.querySelector('button').onclick = function(){

        var amountValue = document.querySelector('#amountValue').value;
        var fromValue = document.querySelector('#fromValue').value;
        var toValue = document.querySelector('#toValue').value;

      

        fetch(`https://api.exchangerate.host/convert?from=${fromValue}&to=${toValue}&amount=${amountValue}`)
        .then(response => response.json())
        .then( data => {
            const result = data.result;
            return document.querySelector('#resultValue').value = result.toFixed(2);
        })

        return false;
    } 
});