'use strict';

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;
let password;
let counter = 1;
do {
  password = prompt('Введите Ваш пароль');
  if (password === null) break;
  else if (passwords.includes(password)) {
    alert('Добро пожаловать!');
    break;
  } else {
    if (counter === attempts) {
      alert('У вас закончились попытки, аккаунт заблокирован!');
      break;
    }
    let n = attempts - counter;
    alert(`Неверный пароль, у вас осталось ${n} попыток`);
    counter += 1;
  }
} while (counter <= attempts);
