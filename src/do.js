// import R from 'ramda';
import Fraction from './fraction';
class Input {
	constructor(input = '') {
    this.str = input;
    this.operator = {
      '*': Fraction.multiply,
      '/': Fraction.divide,
      '+': Fraction.add,
      '-': Fraction.subtract
    }
	}


	getInput(ch) {
		this.str += ch;
  }
  
  clear() {
    this.str = '';
  }

  setTo(str) {
    this.str = str;
  }

  /**
   * 针对按了多次运算符的情况, 取最后一个运算符
   */
	_normailze() {
    this._changeSignToComputer();
		this.str = this.str.replace(/([+\-*/]\s+)+(?=\d)/g, match => {
      return match.slice(-2);
    });
	}

  /**
   * 因为 UI 上显示的符号和数学符号不一样, 所以需要替换
   */
	_changeSignToComputer() {
    const toSign = '/*-+';
    this.str = this.str.trim();
		this.str = this.str.replace(/[÷Ｘ－＋]/gu, match => {
			const index = '÷Ｘ－＋'.indexOf(match);
			if (~index) {
				return toSign[index];
			} else {
				throw Error('What????');
			}
		});
	}

	_toReversePolish() {
    this._normailze();

    let queue = [];
    let stack = [];
    const priority = {
      '*': 110,
      '/': 110,
      '+': 100,
      '-': 100,
      'none': -Infinity
    };

    let express = this.str.split(' ');
    for (let ch of express) {
      if (/\d+/.test(ch)) {
        queue.push(ch);
      } else {
        let top = stack[stack.length - 1] || 'none';
        if (priority[ch] <= priority[top]) {
          queue.push(stack.pop());
        }
        stack.push(ch);
      }
    }
    queue.push(...stack.splice(0).reverse());
    return queue;
  }

  eval() {
    const reversePolish = this._toReversePolish();

    let stack = [];
    for (let symbol of reversePolish) {
      if (/\d+/.test(symbol)) {
        stack.push(+symbol);
      } else {
        stack.push(this.operator[symbol](...stack.splice(-2)));
      }
    }
    let result = eval(String(stack[0]));
    if (String(result).length > 9) {
      result = result.toFixed(9);
    }
    return result;
  }
}

export default Input;

