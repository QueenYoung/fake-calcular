class Fraction {
  constructor(pattern, denominator) {
    if (typeof pattern === 'string') {
      let match = pattern.match(/(\d+)\/(\d+)/);
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
    return !b ? a : this._gcd(b, a % b);
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

  toString() {
    return `${this.numerator}/${this.denominator}`;
  }
}

module.exports = Fraction;