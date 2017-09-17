document.querySelector('.buttons').addEventListener('click', touch());
const result = document.querySelector('.result');
const screenWidth = document.querySelector('.screen').clientWidth;
result.style.fontSize = `${Math.floor(screenWidth / 6 * 1.3)}px`;

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
	return show.reverse().join(',');
}

function changeFont() {
	let resultWidth = result.offsetWidth;
	if (resultWidth > screenWidth) {
		const trueLength = result.textContent.length - 2;
		result.style.fontSize = `${Math.floor(screenWidth / trueLength * 1.3)}px`;
		console.log(result.style.fontSize);
	} else {
		result.style.fontSize = `${Math.floor(screenWidth / 6 * 1.3)}px`;
	}
}

const compute = e => {
	input.getInput(` ${e.target.textContent} `);
};

const getResult = () => {
	let lastSpace;
	let prevOperation;
	return function() {
		try {
			if (lastPress === '=') {
				input.str += prevOperation;
			}
			lastSpace = input.str.lastIndexOf(' ');
			prevOperation = ' ' + input.str.slice(lastSpace - 1);
      let value = input.eval();
      result.textContent = value;
      input.setTo(value);
		} catch (e) {
      console.log(e);
			result.textContent = 'Error';
    }
    changeFont();
	};
};

document
	.querySelectorAll('#add, #subtract, #multiply, #divide')
	.forEach(element => element.addEventListener('click', compute));
document.querySelector('#computer').addEventListener('click', getResult());
// document.querySelector('#percentage').addEventListener('click', percentage);
