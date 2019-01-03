'use strict';

function Cashier(name) {
  this.name = name;
  this.customerMoney = 0;
  this.totalPrice = 0;
  this.change = 0;
  this.error = null;

  this.greet = function() {
    return `Добрый день, вас обслуживает ${this.name}`;
  };

  this.getCustomerMoney = function(value) {
    this.customerMoney = value;
  };

  this.countTotalPrice = function(allProducts, order) {
    const keys = Object.keys(order);
    for (const key of keys) {
      this.totalPrice += order[key] * allProducts[key];
    }
  };

  this.countChange = function() {
    this.change = this.customerMoney - this.totalPrice;
    if (this.change < 0) {
      this.error = 'Очень жаль, вам не хватает денег на покупки';
    }
  };

  this.onSuccess = function() {
    console.log(`Спасибо за покупку, ваша сдача ${this.change}!`);
  };

  this.onError = function() {
    console.log(this.error);
  };

  this.reset = function() {
    this.customerMoney = 0;
    this.totalPrice = 0;
    this.change = 0;
    this.error = null;
  };
}

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40,
};

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1,
};

const poly = new Cashier('Poly');
const mango = new Cashier('Mango');
const ajax = new Cashier('Ajax');

console.log(mango); // объект со свойствами и name содержит значение Mango
console.log(ajax); // объект со свойствами и name содержит значение Ajax
console.log(poly); // объект со свойствами и name содержит значение Ajax

// Проверяем исходные значения полей
console.log(poly.name); // Poly
console.log(poly.customerMoney); // 0
console.log(poly.totalPrice); // 0
console.log(poly.change); // 0
console.log(poly.error); // null

console.log(ajax.greet()); // Добрый день, вас обслуживает Poly

// Вызываем метод countTotalPrice для подсчета общей суммы
// передавая products - список всех продуктов
// и order - список покупок клиента
poly.countTotalPrice(products, order);

// Проверям что посчитали
console.log(poly.totalPrice); // 110

poly.getCustomerMoney(300);

// Проверяем что в поле с деньгами клиента
console.log(poly.customerMoney); // 300

// Вызываем countChange для подсчета сдачи
poly.countChange();

// Проверяем что нам вернул countChange
console.log(poly.change); // 190

// Проверяем результат подсчета денег
if (poly.error === null) {
  // При успешном обслуживании вызываем метод onSuccess
  poly.onSuccess(); // Спасибо за покупку, ваша сдача 190
} else {
  // При неудачном обслуживании вызываем метод onError
  poly.onError(); // Очень жаль, вам не хватает денег на покупки
}

// Вызываем reset при любом исходе обслуживания
poly.reset();

// Проверяем значения после reset
console.log(poly.customerMoney); // 0
console.log(poly.totalPrice); // 0
console.log(poly.change); // 0
console.log(poly.error); // null
