const bn128 = require("./bn128");

// zero
console.log("zero: ", bn128.serialize(bn128.zero));
// g
console.log("g: ", bn128.serialize(bn128.g));

// create private key x
// let x = bn128.randomScalar();
// console.log("random private key: ", bn128.toHex(x));

// calculate public key
// let y = bn128.g.mul(x);
// console.log("random public key: ", bn128.serialize(y));

// calculate g^Max for Zether max value
let l = bn128.g.mul(bn128.maxElem);
console.log("l: ", bn128.serialize(l));

// let adminPub = bn128.unserialize(["0x10de62adb0943bb6b453569df2b370fb35cb0b5bba719d4e9205b600f4b898d6","0x2394fec5ab5fc0747ece8e24728ca85acc92411185317c501ea82cfa30be59d3"]);
// let l = bn128.g.mul(bn128.maxElem).add(adminPub);
// console.log("l: ", bn128.serialize(l));
