const R = require('ramda');
const input = '1++2**/4*5-4+3*4';

let output = input.replace(/[+\-*/]+(?=\d)/g, (match) => {
  return match.slice(-1)[0];
})
console.log(output);


function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function doEval(str) {
  return str.replace(/\d([*/]\d)+/g, (match) => {
    let result = eval(match);
    return result;
  });
}
console.log(doEval(output));


const Fraction = require('../src/fraction');
let f1 = new Fraction('1/3');
let f2 = new Fraction(3, 4);
console.log(f1.add(f2));