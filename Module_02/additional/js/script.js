'use strict';

const sharm = 15;
const hurgada = 25; 
const taba = 6;

let places;
let agree;

places = prompt ('Введите число необходимых мест');

if (places !== null) {
    places = Number(places);    
    if (places > 0) {
      if (places <= taba) {
          agree = confirm ('Есть место в группе Taba, согласен ли Вы быть в этой группе?');
          if (agree) {
            alert ('Приятного путешествия в группе Taba');   
          }  else {
            alert ('Нам очень жаль, приходите еще!');   
          }
      } else if (places <= sharm) { 
        agree = confirm ('Есть место в группе Sharm, согласен ли Вы быть в этой группе?');
        if (agree) {
          alert ('Приятного путешествия в группе Sharm');   
        }  else {
          alert ('Нам очень жаль, приходите еще!');   
        }
        } else if (places <= hurgada) {
            agree = confirm ('Есть место в группе Hurgada, согласен ли Вы быть в этой группе?');
            if (agree) {
              alert ('Приятного путешествия в группе Hurgada');   
            }  else {
              alert ('Нам очень жаль, приходите еще!');   
            }
        } else {
            alert ('Извините, столько мест нет ни в одной группе!');   
        }
    } else {
        alert ('Ошибка ввода!');
    }
} else {
    alert('Нам очень жаль, приходите еще!');
}    