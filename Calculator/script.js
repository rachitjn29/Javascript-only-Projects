const input = document.getElementById('input-box');
const buttons = document.querySelectorAll('button');

let string = "";
Array.from(buttons).forEach(button=>{
    button.addEventListener('click' ,(e)=>{
        if(e.target.classList.contains("number")) {
        string = string + e.target.innerHTML;
        input.value = string; 
        }

        else if(e.target.classList.contains("operator")){
            string = string+ e.target.innerHTML;
            input.value = string;
        }

        else if(e.target.classList.contains("equal")){
            string=eval(string);
            input.value=string;
        }

        else if(e.target.classList.contains("allclear")){
            string ="";
            input.value = string;
        } 

        else if(e.target.classList.contains("del")){
            string =string.slice(0,-1);
            input.value = string;
        }

        else if (e.target.classList.contains("decimal")) {
        let lastNumber = string.split(/[+\-*/]/).pop();
        if (string === "" || /[+\-*/]$/.test(string)) {
        string += "0.";
        }
        else if (!lastNumber.includes(".")) {
        string += ".";
        }
        input.value = string;
        }

        else if(e.target.classList.contains("plusminus")){
            if(string.startsWith("-")) {
                string = string.slice(1);
            }else{
                string = "-" + string;
            }
            input.value = string;
        }

        else if(e.target.classList.contains("root")){
            string = Math.sqrt(Number(string)).toString();
            input.value = string;
        }

        else if(e.target.classList.contains("square")){
            string = Math.pow(Number(string),2).toString(); //cube bhi kr skte
            input.value = string;
        } 

        else if (e.target.classList.contains("pi")) {
        string += Math.PI.toFixed(4);
        input.value = string;
        }

        else if (e.target.classList.contains("tax")) {
        let tax = Number(prompt("Enter Tax %"));
        let num = Number(string);
        string = (num + (num * tax / 100)).toString();
        input.value = string;
        }
    });
});