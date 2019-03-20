import getUserLocation from './location';
import todos from './todos';

// console.log(getUserLocation()
//     .then(loc => {
//         console.log(loc)
//     }).catch(err => {
//         console.log(err);
//     }));

const updateUI = data => {
    console.log(data)
}

const goRace = (name, delay = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Car ${name} finished in ${delay}ms`);
        }, delay)
    })
};

const carA = goRace('car-1', 500);
const carB = goRace('car-2', 100);

// carA.then(console.log);
// carB.then(console.log);

// Promise.race([carA, carB]).then(winner => console.log(winner));

// Promise.all([carA, carB])
//     .then((results) => {
//         results.forEach(el => {
//             console.log(el);
//         })

//     })


/*
 * Есть переменная quantity хранящиая в себе
 * текущее количество единиц какого-то товара на складе.
 * 
 * Напиши функцию processOrder(value), получающую
 * кол-во товаров заказанных покупателем, и возвращающую промис.
 * 
 * Для имитации проверки достаточного количества товаров
 * на складе используй setTimeout с задержкой 500мс.
 * 
 * Если на складе товаров больше либо равно заказанному
 * количеству, функция возвращает промис который исполняется
 * успешно со строкой "Ваш заказ готов!".
 * 
 * В противном случае, со строкой "К сожалению на складе не достаточно товаров!".
 * 
 * Если же пользователь ввел не число, то промис выполняется с ошибкой
 * и значением "Некорректный ввод!".
 */


const DELAY = 1000;
const quantity = 100;

const processOrder = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Number.isInteger(+value)) {
                let ready = value <= quantity;
                ready ? resolve('Ваш заказ готов!') : resolve('К сожалению на складе недостаточно товаров')
            } else {
                reject('Некорректный ввод!');
            }
        }, DELAY)
    })
}

// Вызовы функции для проверки
processOrder(50)
    .then(console.log) // Ваш заказ готов!
    .catch(console.log);

processOrder(50)
    .then(console.log) // Ваш заказ готов!
    .catch(console.log);

processOrder(500)
    .then(console.log) // К сожалению на складе недостаточно товаров!
    .catch(console.log);

processOrder("lorem")
    .then(console.log)
    .catch(console.log); // Некорректный ввод!

processOrder("99")
    .then(console.log)
    .catch(console.log); // Некорректный ввод!