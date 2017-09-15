import R from 'ramda';
const result = document.querySelector('.result');

let willBeShow = null;

function choose(name) {
  switch (name) {
    case 'add':
      return R.add;  
    case 'subtract':
      return R.subtract
    case 'multiply':
      return R.multiply;
    case 'divide':
      return R.divide;
  }
}


function doCompute(name, sign) {
  let a = +result.textContent;
  willBeShow = R[name](a);
  if (localStorage.lastPass[localStorage.lastPass.length - 1].match(/\d/)) {
    localStorage.lastPass += sign;
  } else {
    localStorage.lastPass = localStorage.lastPass.slice(0, -1) + sign;
  }
}

function add() {
  doCompute('add', '+');
}

function subtract() {
  doCompute('subtract', '-');
}

function multiply() {
  doCompute('multiply', '*');
}

function divide() {
  doCompute('divide', '/');
}

function getResult() {
  if (!localStorage.lastPass[0].match(/\d/)) {
    result.textContent = eval(0 + localStorage.lastPass);
  } else {
    result.textContent = eval(localStorage.lastPass);
  }
  localStorage.lastPass = result.textContent;
  // let b = +result.textContent;
  // result.textContent = willBeShow(b);
  // const lastFunction = R.flip(choose(localStorage.getItem('lastOperate')));
  // willBeShow = lastFunction(+localStorage.getItem('lastPass'));
}

function percentage() {
  const { lastPass } = localStorage;
  if (lastPass === '0') return;
  let i = lastPass.length - 1;
  while (i > 0) {
    if (lastPass[i].match(/[+\-*/]/)) {
      break;
    }
    i--;
  }

  let divide100;
  if (i) {
    divide100 = lastPass.slice(i + 1) / 100;
    result.textContent = divide100;
    localStorage.lastPass = lastPass.slice(0, i + 1) + divide100;
  } else {
    divide100 = localStorage.lastPass / 100;
    localStorage.lastPass = divide100;
    result.textContent = divide100;
  }
}

function negative() {
  
}


document.querySelector('#add').addEventListener('click', add);
document.querySelector('#computer').addEventListener('click', getResult);
document.querySelector('#subtract').addEventListener('click', subtract);
document.querySelector('#multiply').addEventListener('click', multiply);
document.querySelector('#divide').addEventListener('click', divide);
document.querySelector('#percentage').addEventListener('click', percentage);