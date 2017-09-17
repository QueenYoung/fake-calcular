import R from 'ramda';
class Input {
  constructor(input = '') {
    this.str = input;
  }

  operator = [R.add, R.subtract, R.multiply, R.divide]

  getInput(ch) {
    this.str += ch;
  }

  _normailze() {
    this._changeSignToComputer();
    this.str = this.str.replace(/[+\-*/]+(?=\d)/g, match => {
      return match.slice(-1)[0];
    });
  }

  _changeSignToComputer() {
    const toSign = '/*-+';
    this.str = this.str.replace(/[÷Ｘ－＋]/gu, match => {
      const index = '÷Ｘ－＋'.indexOf(match);
      if (~index) {
        throw Error('What????');
      } else {
        return toSign[index];
      }
    });
  }

  eval() {
    this._normailze();
  }
}
