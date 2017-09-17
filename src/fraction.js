class Fraction {
  constructor(pattern, denominator) {
    if (typeof pattern === 'string') {
      let match = pattern.match(/(-?\d+)\/(\d+)/);
      if (match) {
        this.numerator = match[1];
        this.denominator = match[2];
      } else {
        throw Error('Illegal number.');
      }
    } else {
      this.numerator = pattern;
      this.denominator = denominator;
    }
  }

  
  _lcm(a, b) {
    return a * b / this._gcd(a, b);
  }

  _gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    return !b ? a : this._gcd(Math.abs(b), a % b);
  }
  
  _reduce() {
    const g = this._gcd(this.numerator, this.denominator);
    if (g === 1) return this;

    this.numerator /= g;
    this.denominator /= g;

    return this;
  }

  add(other) {
    if (!(other instanceof Fraction)) { return; }
    const { numerator, denominator } = other;
    
    const newDenominator = this._lcm(this.denominator, denominator);
    const newNumberator = newDenominator / this.denominator * this.numerator
      + newDenominator / denominator * numerator;
    let fra = new Fraction(newNumberator, newDenominator);
    return fra._reduce();
  }

  substrct(other) {
    if (!(other instanceof Fraction)) { return; }
    return this.add(other.multiply(-1));
  }

  multiply(number) {
    number = +number;
    if (typeof number !== 'number') {
      throw TypeError('This is not a number!');
    }
    return new Fraction(this.numerator * number, this.denominator)._reduce();
  }

  divide(number) {
    let { numerator, denominator } = this;
    if (numerator % number === 0) {
      numerator /= number;
    } else {
      denominator *= number;
    }
    return new Fraction(numerator, denominator);
  }

  toString() {
    return `${this.numerator}/${this.denominator}`;
  }
}

export default Fraction;
// module.exports = Fraction;