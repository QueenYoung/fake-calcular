const _gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);

  return !b ? a : _gcd(b, a % b);
};
const _lcm = (a, b) => {
  return a * b / _gcd(a, b);
};

function normailze(a, b) {
  if (typeof a === 'number') {
    a = new Fraction(a, 1);
  }
  if (typeof b === 'number') {
    b = new Fraction(b, 1);
  }
  return [a, b];
}

class Fraction {
  constructor(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;

		this._reduce();
  }

  _reduce() {


		// 现将小数点装化成整数. 比如 0.1 转化成 1 / 10 这样的
    let fra1 = (String(this.numerator).match(/\.\d+/) || [''])[0].length;
    let fra2 = (String(this.denominator).match(/\.\d+/) || [''])[0].length;

    let exp = Math.max(fra1, fra2);
    this.numerator *= Math.pow(10, exp);
    this.denominator *= Math.pow(10, exp);

    const g = _gcd(this.numerator, this.denominator);
    if (g === 1) return this;

    this.numerator /= g;
    this.denominator /= g;
  }

  static add(a, b) {
		[a, b] = normailze(a, b);
    const newDenominator = _lcm(a.denominator, b.denominator);
    const newNumerator =
      a.numerator * newDenominator / a.denominator +
			b.numerator * newDenominator / b.denominator;
    return new Fraction(newNumerator, newDenominator);
  }

  static subtract(a, b) {
		[a, b] = normailze(a, b);
    return Fraction.add(a, Fraction.multiply(b, -1));
  }

  static multiply(a, b) {
    [a, b] = normailze(a, b);
    return new Fraction(
      a.numerator * b.numerator,
      a.denominator * b.denominator
    )._reduce();
  }

  static divide(a, b) {
		[a, b] = normailze(a, b);
		if (b.numerator === 0) {
			throw TypeError("Can't divide by 0");
		}
		return Fraction.multiply(a, new Fraction(b.denominator, b.numerator));
  }

  toString() {
    return `${this.numerator}/${this.denominator}`;
  }
}

export default Fraction;
// module.exports = Fraction;
