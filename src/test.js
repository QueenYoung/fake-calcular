const R = require('ramda');
let number = [1, 2, 3, 4, 5];
let operator = [R.add, R.multiply, R.add, R.subtract];

console.log(1+2*3+4-5);
R.compose(R.add(R.add(1, R.multiply(2, 3)), 4), 5);