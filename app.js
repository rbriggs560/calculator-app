/* SELECTS ALL THE HTMLS ELEMENT FOR ADDING FUNCTIONILITY */
const button = document.querySelectorAll(".numeric-keys");
const operationKeys = document.querySelectorAll(".operation-keys");
const geleteButton = document.querySelector(".delete-button");
const resetButton = document.querySelector(".clear-button");
const getEqualButton = document.querySelector(".equal-button");
const displayBox = document.querySelector(".calculation");

/* INITIALIZING CALCULATOR CLASS*/
class Calculator{
    constructor(displayBox){
        this.displayBox = displayBox;
        this.clear();
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = ""
        this.operation = undefined;
    }

    deleteNumber(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    computation(){
        let computation;

        const previousValue = parseFloat(this.previousOperand);
        const currentValue = parseFloat(this.currentOperand);

        if(isNaN(currentValue) || isNaN(previousValue) ){
            return;
        }

        switch(this.operation){
            case "+":
                computation = previousValue + currentValue
                break
            case "-":
                computation = previousValue - currentValue
                break
            case "*":
                computation = previousValue * currentValue
                break
            case "/":
                computation = previousValue / currentValue
                break
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""

    }

    getOperation(operation){
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";

        if (this.currentOperand == ""){
            return;
        }
        if(this.previousOperand !== ""){
            this.computation();
        }
        
    }

    appendNumber(num){
        if ((num == ".") && (this.currentOperand.includes("."))){
            return 
        }
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    changeDisplayNum(num){
        const stringNum = num.toString();
        const realNum = parseFloat(stringNum.split(".")[0]);
        const decimalNum = stringNum.split(".")[1];
        let integerDisplay;

        if(isNaN(realNum)){
            integerDisplay = "";
        }

        else{
            integerDisplay = realNum.toLocaleString("en", )
        }

        if(decimalNum != null){
            return `${integerDisplay}.${decimalNum}`;
        }
        else
        {
            return integerDisplay
        }

    }

    updateDisplayBox(){
        this.displayBox.textContent = this.changeDisplayNum(this.currentOperand);
    }
} 


/* INITIALIZING THE CALCULATOR OBJECT */
const calculator = new Calculator(displayBox);

/* SELECTE ALL THE NUMERIC BUTTIONS*/
button.forEach(number =>{
    number.addEventListener("click", event =>{
        calculator.appendNumber(number.textContent);
        calculator.updateDisplayBox();
    })
});

/* SELECTE ALL OPERATION KEYS/BUTTONS*/
operationKeys.forEach(theKey =>{
    theKey.addEventListener("click", event =>{
        calculator.getOperation(theKey.textContent)
        calculator.updateDisplayBox()
    })
});

getEqualButton.addEventListener("click", () =>{
    calculator.computation()
    calculator.updateDisplayBox()
})

resetButton.addEventListener("click", button =>{
    calculator.clear()
    calculator.updateDisplayBox()
})

geleteButton.addEventListener("click", button =>{
    calculator.deleteNumber()
    calculator.updateDisplayBox()
})