// import 'jest';
let numberFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 8,
  maximumSignificantDigits: 9
});

function add(origin, num) {
	origin = origin.replace(/,/g, () => '');
	// if (origin.length > 8) return origin;
	origin = numberFormat.format(origin + num);
	return origin;
	// return add(origin, num + 1);
}

test('Show more input', () => {
	expect(add('123456789', 5)).toBe('123456789');
});
