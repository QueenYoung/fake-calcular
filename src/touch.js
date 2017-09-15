document.querySelector('.buttons').addEventListener('click', touch());
const result = document.querySelector('.result');
const screenWidth = document.querySelector('.screen').clientWidth;
result.style.fontSize = `${Math.floor(screenWidth / 6 * 1.3)}px`;

const inputElement = document.querySelector('input');
function touch() {
  let prevTouch = null;
  return function(e) {
    const { target: button } = e;
    if (button.classList.contains('operator')) {
      button.classList.add('active');
      prevTouch && prevTouch.classList.remove('active');
    } else {
      prevTouch && prevTouch.classList.remove('active');
    }

    if (button.classList.contains('number')) {
      numberPass(button);
    }
    prevTouch = button;
  };
}

document
  .querySelector('.ac')
  .addEventListener('click', () => { result.textContent = 0; changeFont();});

function numberPass(target) {
  let number = target.textContent;
  if (result.textContent.length === 11) return;

  let prevShow = result.textContent.split(',');
  if (prevShow.length === 1 && prevShow[0][0] === '0') {
    prevShow[0] = [];
  }
  result.textContent = addComma(prevShow, number);
  // inputElement.value = result.textContent;
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
