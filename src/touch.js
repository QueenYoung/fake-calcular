document.querySelector('.buttons').addEventListener('click', touch());
const result = document.querySelector('.result');
function touch() {
  let prevTouch = null;
  return function (e) {
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
  }
}

function numberPass(target) {
  let number = target.textContent;
  if (result.textContent.length === 11) return;

  let prevShow = result.textContent.split(',');
  if (prevShow.length === 1 && prevShow[0][0] === '0') {
    prevShow[0] = [];
  } 
  result.textContent = addComma(prevShow, number);
}

function addComma(result, input) {
  console.log(result.clientElement);
  result = result.reverse().join('');
  result += input;

  let length = result.length;
  let show = [];
  for (let i = 0; i < Math.ceil(length / 3); ++i) {
    show.push(result.slice(i * 3, (i + 1) * 3));
  }
  return show.reverse().join(',');
}