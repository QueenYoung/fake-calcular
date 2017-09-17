const R = require('ramda');
const Fraction = require('../src/fraction');
const input = '1++20**/11*5-4+3*4';

let output = input.replace(/[+\-*/]+(?=\d)/g, (match) => {
  return match.slice(-1)[0];
})
console.log(output);


function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function doEval(str) {
  return str.replace(/(\d+[*/])+\d+/g, (str) => {
    let origin = new Fraction(1, 1);
    const operator = ['*'].concat(str.match(/[+\-*/]/g));
    const number = str.split(/[+\-*/]/);
    number.forEach((num, i) => {
      if (operator[i] === '*') {
        origin = origin.multiply(num);
      } else {
        origin = origin.divide(num);
      }
    });
    return String(origin);
  });
}
console.log(doEval(output));


let f1 = new Fraction('1/3');
let f2 = new Fraction(3, 4);
console.log(f2.substrct(f1));

function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length ?
      fn.apply(this, args) :
      (...rest) => curried(...args, ...rest);
  }
}
