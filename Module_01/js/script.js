'use strict';

const adminLogin = 'admin';
const adminPassword = 'm4ng0h4ckz';

const messageLogin = 'Введите логин';
const messagePsw = 'Введите пароль';
const messageCancel = 'Отменено пользователем!';
const messageRight = 'Добро пожаловать!';
const messageWrong = 'Доступ запрещен, неверный пароль!';

let login  = prompt (messageLogin);

if (login === null) {
  alert (messageCancel);
} else if (login === adminLogin) {
        let psw = prompt(messagePsw);
        if (psw === null) {
            alert (messageCancel)
        } else if (psw === adminPassword) {
            alert (messageRight);
        } else {
            alert (messageWrong);
        }
}    

