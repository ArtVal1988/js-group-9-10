// const calendar = {
//   dates: [1, 2, 3, 4, 5],
//   [Symbol.iterator]() {
//     let counter = 0;

//     const dates = this.dates;
//     const max = dates.length;

//     return {
//       next() {
//         return {
//           done: counter >= max,
//           value: counter < max ? dates[counter++] : undefined,
//         };
//       },
//     };
//   },
// };

// console.log(calendar.dates);

// console.log(calendar[Symbol.iterator]);

// for (const date of calendar) {
//   console.log(date);
// }

// function createIterator(items) {
//   let i = 0;

//   //  Возвращаем итератор, объект с методом next
//   return {
//     next() {
//       const done = i >= items.length;
//       const value = !done ? items[i++] : undefined;

//       return {
//         done: done,
//         value: value,
//       };
//     },
//   };
// }

// const iterator = createIterator([1, 2, 3, 4]);

// console.log(iterator.next()); // "{ value: 1, done: false }"
// console.log(iterator.next()); // "{ value: 2, done: false }"
// console.log(iterator.next()); // "{ value: 3, done: false }"
// console.log(iterator.next()); // "{ value: 4, done: false }"
// console.log(iterator.next()); // "{ value: undefined, done: true }"
// console.log(iterator.next()); // "{ value: undefined, done: true }"
// console.log(iterator.next()); // "{ value: undefined, done: true }"
// console.log(iterator.next()); // "{ value: undefined, done: true }"

// function* myGen() {
//   yield 1;
//   console.log('Exit 1');
//   yield 2;
//   console.log('Exit 2');
//   yield 3;
//   console.log('Exit 3');
// }
// const gen = myGen();

// // console.log(gen.next());
// // console.log(gen.next());
// // console.log(gen.next());

// for (const value of gen) {
//   console.log(value);
// }

// const questionGenerator = function*() {
//   const answer = yield 'Сколько будет 5 + 5?';

//   console.log(answer);
// };

// const question = questionGenerator();

// console.log(question.next().value);
// question.next(20);

// const getTodo = id => {
//   return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
//     response => response.json(),
//   );
// };

// getTodo(13).then(json => console.log(json));

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

const getTodo = async id => {
  try {
    const response = await axios.get(`posts/${id}`);
    // const data = await response.json();

    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTodoUI = async () => {
  try {
    const todo = await getTodo(3);
    console.log(todo);
  } catch (err) {}

  //
};

updateTodoUI();

// const getUserFriends = async () => {
//   const user = await fetch('/user-profile');
//   const idList = await fetch(`/users/${user.id}/friends`);
//   const promises = idList.map(id => fetch(`/users/${id}`));
//   const friends = await Promise.all(promises);

//   return friends;
// };

// // Асинхронная функция всегда вернет промис
// const promise = getUserFriends();
// promise.then(friends => console.log(friends));
