
const _gcd = (a, b) => {
	a = Math.abs(a);
	b = Math.abs(b);
	return !b ? a : _gcd(Math.abs(b), a % b);
};
const _lcm = (a, b) => {
	return a * b / _gcd(a, b);
};

function doCompute(a, b, cb1, cb2) {
	let result;
	if (a instanceof Fraction || b instanceof Fraction) {
    result = cb1(a, b);
  } else if (typeof +a === 'number' && typeof +b === 'number') {
		result = cb2(+a, +b);
	} else {
		throw TypeError(`This is illegal with ${a} and ${b}`);
	}
	return result;
}

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

	_reduce() {
		const g = _gcd(this.numerator, this.denominator);
		if (g === 1) return this;

		this.numerator /= g;
		this.denominator /= g;

		return this;
	}

	static add(a, b) {
    return doCompute(a, b, (a, b) => {
      if (typeof a == 'number') {
        a = new Fraction(a, 1);
      } else if (typeof b == 'number') {
        b = new Fraction(b, 1);
      } 
      const newDenominator = _lcm(a.denominator, b.denominator);
      const newNumerator = a.numerator * newDenominator / a.denominator
        + b.numerator * newDenominator / b.denominator;
      return new Fraction(newNumerator, newDenominator)._reduce();
    }, (a, b) => {
      return new Fraction(a + b, 1);
    });
	}

	static subtract(a, b) {
    return doCompute(a, b, (a, b) => {
      return Fraction.add(a, Fraction.multiply(b, -1));
    }, (a, b) => {
      return new Fraction(a - b, 1);
    });
	}

	static multiply(a, b) {
    return doCompute(a, b, (a, b) => {
			return new Fraction(a.numerator * b, a.denominator)._reduce();
    }, (a, b) => new Fraction(a * b, 1) )
	}

	static divide(a, b) {
		return doCompute(
			a,
			b,
			(a, b) => {
				if (b === 0) {
					throw TypeError('Can\'t divide 0');
				}
				let { numerator, denominator } = a;
				if (numerator % b === 0) {
					numerator /= b;
				} else {
					denominator *= b;
				}
				return new Fraction(numerator, denominator);
			},
			(a, b) => new Fraction(a, b)._reduce()
		);
	}

	toString() {
		return `${this.numerator}/${this.denominator}`;
	}
}

export default Fraction;
// module.exports = Fraction;
