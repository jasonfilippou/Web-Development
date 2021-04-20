function calculate(num1, num2, operation)
{
    return operation(num1, num2);
}

function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return add(num1, -num2);
}

function multiply(num1, num2)
{
    return num1 * num2;
}

function divide(num1, num2)
{
    if(num2 == 0)
    {
        throw "Trying to divide by zero!";
    }
    else
    {
        return num1 / num2;
    }
};

[add, subtract, multiply, divide].forEach(op=>console.log(calculate(3, 5, op)))
