const Big = require('big.js');

const a = 0.02 * 100;
const b = Big(0.02) * 100.4;
console.log(a);
// eslint-disable-next-line radix
console.log(parseInt(b.toExponential()));
