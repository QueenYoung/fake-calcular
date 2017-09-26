document.querySelector('.buttons').addEventListener('click', touch());
const result = document.querySelector('.result');
const screenWidth = document.querySelector('.screen').clientWidth;
let normalFontSize = screenWidth / 4.5;
const lengthLimit = 9;
result.style.fontSize = normalFontSize + 'px';

import Input from './do';
import R from 'ramda';
const input = new Input();
let lastPress = '';

function touch() {
  let prevTouch = document.querySelector('body');
  return function(e) {
    const { target: button } = e;
    if (button.classList.contains('operator')) {
      button.classList.add('active');
      prevTouch.classList.remove('active');
    } else {
      prevTouch.classList.remove('active');
    }

    if (button.classList.contains('number')) {
      numberPass(button, prevTouch.classList.contains('operator'));
    }
    prevTouch = button;
    lastPress = prevTouch.textContent;
  };
}

document.querySelector('.ac').addEventListener('click', () => {
  result.textContent = 0;
  input.clear();
  changeFont();
});

let numberFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: lengthLimit
});

function numberPass(target, needBeClear) {
  if (needBeClear) {
    result.textContent = '';
  }
  let number = target.textContent;
  input.add(number);
  let text = result.textContent;
  if ((text.match(/\d/g) || '').length > 8) return;

	// 先将 format 后的样子转成成标准数字
	text = text.replace(/,/g, () => '');
	
	// 针对 . 的情况要另外讨论
	result.textContent = number === '.'
		? numberFormat.format(text) + '.'
		: numberFormat.format(text + number);
  changeFont();
}

// TODO: 更为平滑的字体大小过渡方式
function changeFont() {
  if (result.textContent.length > 7) {
    const theSize = Math.floor(screenWidth / 7);
    // result.style.fontSize = Math.min(normalFontSize, theSize) + 'px';
    result.style.fontSize = theSize + 'px';
  } else {
    result.style.fontSize = normalFontSize + 'px';
  }
}

// 用来将结果显示为更加规范的形式.
function adjustText(value) {
  const integer = Math.trunc(value);
  const fraction = value - integer;
	let showText = value;

  const digitsLength = num => R.compose(Math.ceil, Math.log10)(num);
  if (integer > 10e8 && Number.isSafeInteger(value)) {
    let digits = digitsLength(integer);
    // + 2 是因为 e+ 占两位的缘故.
    const lengthOfExp = digitsLength(digits) + 2;
    let exp = integer.toExponential(lengthLimit - lengthOfExp);
    showText = exp;
  } else if (String(integer).length + String(fraction).length > lengthLimit) {
    // 因为 0 和 1 的时候取对数会出现问题
    const lengthOfInteger = digitsLength(integer || 1) || 1;
    // 直接使用 1 + 被 fixed 的值后还是会出现浮点数问题.
    showText = (integer + fraction).toFixed(lengthLimit - lengthOfInteger);
  }
  return showText;
}

const compute = e => {
  // 这两边的空格是为了 split 而用.
  input.add(` ${e.target.textContent} `);
};

const getResult = () => {
  // 用来跟踪上一次输入的数据, 以支持重复操作.
  let lastSpace;
  let prevOperation;
  return function() {
    try {
      // 将上一次的操作添加进来.
      if (lastPress === '=') {
        input.str += prevOperation;
      }
      lastSpace = input.str.lastIndexOf(' ');
      prevOperation = ' ' + input.str.slice(lastSpace - 1);
      if (lastPress === '%') {
        prevOperation = prevOperation.replace(/\d+/, match => match * 100);
      }

      let value = input.eval();

      result.textContent = numberFormat.format(adjustText(value));
    } catch (e) {
      result.textContent = 'Error';
    }
    changeFont();
  };
};

function percentage() {
  result.textContent = +result.textContent / 100;
  const theLastNumber = /(\d+\.)?\d+$/;
  input.setTo(input.str.replace(theLastNumber, match => match / 100));
}
function toNegative() {
  result.textContent = +result.textContent * -1;
  const theLastNumber = /(\d+\.)?\d+$/;
  input.setTo(input.str.replace(theLastNumber, match => match * -1));
}

document
  .querySelectorAll('#add, #subtract, #multiply, #divide')
  .forEach(element => element.addEventListener('click', compute));
document.querySelector('#computer').addEventListener('click', getResult());
document.querySelector('#percentage').addEventListener('click', percentage);
document.querySelector('.sign').addEventListener('click', toNegative);
