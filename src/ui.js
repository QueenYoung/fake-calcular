document.querySelector('.buttons').addEventListener('click', touch());
const result = document.querySelector('.result');
const screenWidth = document.querySelector('.screen').clientWidth;
let normalFontSize = 80;
result.style.fontSize = normalFontSize + 'px';

const inputElement = document.querySelector('input');
import Input from './do';
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


// TODO: 使用 Intl.NumberFormat().format 来修改数字
function numberPass(target, needBeClear) {
	if (needBeClear) {
		result.textContent = '';
	}
	let number = target.textContent;
	input.getInput(number);
	if (result.textContent.length === 11) return;

	let prevShow = result.textContent.split(',');
	if (prevShow.length === 1 && prevShow[0][0] === '0') {
		prevShow[0] = [];
	}
	result.textContent = addComma(prevShow, number);
	changeFont();
}

function addComma(result, input) {
	result = result.reverse().join('');
	result += input;

	let length = result.length;
	let show = [];
	for (let i = 0; i < Math.ceil(length / 3); ++i) {
		show.push(result.slice(i * 3, (i + 1) * 3));
	}
	return show.join(',');
}

function changeFont() {
	if (result.textContent.length > 7) {
		const theSize = Math.floor(screenWidth / 7);
		// result.style.fontSize = Math.min(normalFontSize, theSize) + 'px';
		result.style.fontSize = theSize + 'px';
	} else {
		result.style.fontSize = normalFontSize + 'px';
	}
}

const compute = e => {
	input.getInput(` ${e.target.textContent} `);
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

			let value = input.eval() + '';

			result.textContent = value;
			input.setTo(value);
		} catch (e) {
			console.log(e);
			result.textContent = 'Error';
		}
		changeFont();
	};
};


function percentage(e) {
	result.textContent = +result.textContent / 100;
	input.setTo(input.str.replace(/\d+$/, match => match / 100));
}
function toNegative(e) {
	result.textContent = +result.textContent * -1;
	input.setTo(input.str.replace(/\d+$/, match => match * -1));
}


document
	.querySelectorAll('#add, #subtract, #multiply, #divide')
	.forEach(element => element.addEventListener('click', compute));
document.querySelector('#computer').addEventListener('click', getResult());
document.querySelector('#percentage').addEventListener('click', percentage);
document.querySelector('.sign').addEventListener('click', toNegative);
