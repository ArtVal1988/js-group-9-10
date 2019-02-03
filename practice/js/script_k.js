'use strict';
/*Есть массив logins с логинами пользователей. Напишите скрипт добавления логина в массив logins.
Добавляемый логин должен:
проходить проверку на длину от 4 до 16-ти символов включительно
быть уникален, то есть отсутствовать в массиве logins
🔔 Разбейте задачу на подзадачи с помощью функций.
Напишите функцию isLoginValid(login), в которой проверьте количество символов параметра login
 и верните true или false в зависимости от того, попадает ли длина параметра в заданный диапазон 
 от 4-х до 16-ти символов включительно.
Создайте функцию isLoginUnique(allLogins, login), которая принимает логин и список всех логинов
 как параметры и проверяет наличие login в массиве allLogins, возвращая true если такого логина 
 еще нет и false если логин уже используется.
Далее напишите функцию addLogin(allLogins, login) которая:
Принимает новый логин и массив всех логинов как параметры
Проверяет валидность логина используя вспомогательную функцию isLoginValid
Если логин не валиден, прекратить исполнение функции addLogin и вернуть строку 'Ошибка! Логин
 должен быть от 4 до 16 символов'
Если логин валиден, функция addLogin проверяеть уникальность логина с помощью функции isLoginUnique
Если isLoginUnique вернет false, тогда addLogin не добавляет логин в массив и возвращает строку 
'Такой логин уже используется!'
Если isLoginUnique вернет true, addLogin добавляет новый логин в logins и возвращает строку 
'Логин успешно добавлен!'*/

//Global env
//Record: {}
//Parent: null

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

//Global env
//Record: {logins: ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123']}
//Parent: null

//[[Environment]]: Global env
const isLoginValid = function(login) {
  return login.length >= 4 && login.length <= 16;
};

//Global env
//Record: {logins: ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'], isLoginValid: <function> }
//Parent: null

//[[Environment]]: Global env
const isLoginUnique = function(allLogins, login) {
  return !allLogins.includes(login);
};

//Global env
//Record: {logins: ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'], isLoginValid: <function>,
//isLoginUnique: <function>}
//Parent: null

//[[Environment]]: Global env
const addLogin = function(allLogins, login) {
  //addLogin env
  //Record: {allLogins: ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'], login: 'Ajax' }
  //Parent: Global env

  //[[Environment]]: addLogin
  if (!isLoginValid(login)) {
    //isLoginValid env
    //Record: {login: 'Ajax'}
    //Parent: addLogin

    return console.log('Oшибка! Логин должен быть от 4 до 16 символов');
  } else if (!isLoginUnique(allLogins, login)) {
    //isLoginUnique env
    //Record: {allLogins: ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'], login: 'Ajax'}
    //Parent: addLogin

    return console.log('Такой логин уже используется!');
  } else {
    logins.push(login);
    return console.log('Логин успешно добавлен!');
  }
};

//Global env
//Record: {logins: ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'], isLoginValid: <function>,
//isLoginUnique: <function>, addLogin: <function>}
//Parent: null

// Вызовы функции для проверки
addLogin(logins, 'Ajax'); // 'Логин успешно добавлен!'
addLogin(logins, 'robotGoogles'); // 'Такой логин уже используется!'
addLogin(logins, 'Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins, 'dakfjmdvskrsotmvsogtj'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
