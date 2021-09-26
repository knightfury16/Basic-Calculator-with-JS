const numberButton = document.querySelectorAll('#number');
const operationButton = document.querySelectorAll("#operation");
const equalButton = document.querySelector("#equal"); 
const deleteButton = document.querySelector("#delete");
const allClearButton = document.querySelector("#all-clear");

const previousOperandText = document.querySelector("#previous-operand");  
const currentOperandText = document.querySelector("#current-operand");  
let flag;


numberButton.forEach(btn => {
    btn.addEventListener("click", function (){
        displayNumber(btn.innerHTML,0);
    });
});

function displayNumber(number,operation)
{
    switch(operation)
    {
        case 0:
            if(number==='.' && currentOperandText.innerHTML.includes('.'))return;
            else if(!flag) currentOperandText.innerHTML += number;
            else {
                delAll();
                currentOperandText.innerHTML += number;
                flag =false;
            }

            break;
        case 1:
            if(currentOperandText.innerHTML === '' || isNaN(currentOperandText.innerHTML))break;
            if(previousOperandText.innerHTML === '')previousOperandText.innerHTML = currentOperandText.innerHTML + number;

            else if(isNaN(previousOperandText.innerHTML) && currentOperandText.innerHTML===''){

                previousOperandText.innerHTML = previousOperandText.innerHTML.substring(0,previousOperandText.innerHTML.length - 1);

                previousOperandText.innerHTML += number;
            }

            else if(isNaN(previousOperandText.innerHTML) && flag)
            {
                previousOperandText.innerHTML = currentOperandText.innerHTML + number;
                currentOperandText.innerHTML = '';
                flag = false;

            }

            else {
                
                previousOperandText.innerHTML = 
                computeValue(previousOperandText.innerHTML,currentOperandText.innerHTML,previousOperandText.innerHTML.substring(previousOperandText.innerHTML.length -1, previousOperandText.innerHTML.length))+number;
            }

            currentOperandText.innerHTML = '';
            break;
        
        case 2:
            if(previousOperandText.innerHTML==='')break;
            let previousOperandValue = previousOperandText.innerHTML.substring(0,previousOperandText.innerHTML.length - 1);
            number = previousOperandText.innerHTML.substring(previousOperandText.innerHTML.length - 1,previousOperandText.innerHTML.length);
            previousOperandText.innerHTML = previousOperandText.innerHTML + currentOperandText.innerHTML;
            currentOperandText.innerHTML = computeValue(previousOperandValue,currentOperandText.innerHTML,number);
            flag = true;
            break;

    }
}

function delAll()
{
    currentOperandText.innerHTML = '';
    previousOperandText.innerHTML = '';
}

function del()
{
    currentOperandText.innerHTML = currentOperandText.innerHTML.toString().slice(0,-1);
}

function computeValue(previousNum,currentNum,operand)
{
    switch(operand)
    {
        case '+': return (parseFloat(previousNum)+parseFloat(currentNum)).toString();
        case '-': return (parseFloat(previousNum)-parseFloat(currentNum)).toString();  
        case '*': return (parseFloat(previousNum)*parseFloat(currentNum)).toString();
        case '÷': return (parseFloat(previousNum)/parseFloat(currentNum)).toString();
    }
}

operationButton.forEach(btn => {
    btn.addEventListener("click",function(){displayNumber(btn.innerHTML,1)})
})

equalButton.addEventListener("click", function(){displayNumber(null,2)});

allClearButton.addEventListener("click", delAll);

deleteButton.addEventListener("click", del);