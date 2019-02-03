'use strict';

let userInput, userNumber;
const numbers = [];
let total = 0;

do {
  userInput = prompt('Введите новое число для массива');
  if (userInput === null) break;
  if (userInput !== '') {
    userNumber = Number(userInput);
    if (!Number.isNaN(userNumber)) {
      numbers.push(userNumber);
    } else {
      alert('Было введено не число, попробуйте еще раз');
    }
  }
} while (true);

if (numbers.length !== 0) {
  for (let number of numbers) {
    total += number;
  }
  alert(`Общая сумма чисел равна ${total}`);
}
