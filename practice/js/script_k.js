'use strict';

const sharm = 15;
const hurgada = 6;
const taba = 25;

const getNumber = prompt('Введите число необходимых мест?');
let answer;

if (getNumber === null) {
  alert('Нам очень жаль, приходите еще!');
} else if (Number(getNumber) < 0 || !Number.isInteger(Number(getNumber))) {
  alert('Ошибка ввода!');
} else if (Number(getNumber) <= hurgada) {
  answer = confirm(
    'Eсть место в группе Хугарда, вы согласны быть в этой группе?',
  );
  if (answer === true) {
    alert('Приятного путешествия в группе Хугарда!');
  } else {
    alert('Нам очень жаль, приходите еще!');
  }
} else if (Number(getNumber) <= sharm) {
  answer = confirm('Eсть место в группе Шарм, вы согласны быть в этой группе?');
  if (answer === true) {
    alert('Приятного путешествия в группе Шарм');
  } else {
    alert('Нам очень жаль, приходите еще!');
  }
} else if (Number(getNumber) <= taba) {
  answer = confirm('Eсть место в группе Таба, вы согласны быть в этой группе?');
  if (answer === true) {
    alert('Приятного путешествия в группе Таба');
  } else {
    alert('Нам очень жаль, приходите еще!');
  }
} else {
  alert('Извините, столько мест нет ни в одной группе!');
}
