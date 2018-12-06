'use strict';

let userInput, userNumber;
const numbers = [];
let total = 0;

do {
    userInput = prompt('Введите новое число для массива');
    if (userInput === null) break;
    if (userInput !=='') {
        userNumber = Number(userInput);
        if (!Number.isNaN(userNumber)){
            numbers.push(userNumber);
        } else {
            alert("Было введено не число, попробуйте еще раз");       
        }
    }
    
} while (true)

for (let number of numbers) {
    total +=number;
}


alert(`Общая сумма чисел равна 0${total}`);