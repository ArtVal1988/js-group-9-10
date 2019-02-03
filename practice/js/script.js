'use strict';

const questions = [
  { _id: 1, prop1: 'lol', prop2: 'lol2' },
  { _id: 2, prop1: 'am', prop2: 'am2' },
];

const mapper = questions =>
  questions.map(({ _id: id, ...props }) => ({ id, ...props }));

console.log(mapper(questions));
