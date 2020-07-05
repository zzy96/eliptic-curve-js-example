const BN = require('bn.js');
const EC = require('elliptic');
const crypto = require('crypto');

const FIELD_MODULUS = new BN("21888242871839275222246405745257275088696311157297823662689037894645226208583", 10);
const GROUP_MODULUS = new BN("21888242871839275222246405745257275088548364400416034343698204186575808495617", 10);
const MAX = 4294967295;

const bn128 = {};

// The elliptic.js curve object
bn128.curve = new EC.curve.short({
    a: '0',
    b: '3',
    p: FIELD_MODULUS.toString(16),
    n: GROUP_MODULUS.toString(16),
    gRed: false,
    g: ['77da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d4', '1485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875'],
});
bn128.zero = bn128.curve.g.mul(0);
bn128.g = bn128.curve.g;
bn128.p = BN.red(new BN(bn128.curve.p.toString(16), 16)); // temporary workaround due to
bn128.q = BN.red(new BN(bn128.curve.n.toString(16), 16)); // https://github.com/indutny/elliptic/issues/191
bn128.max = MAX;
bn128.maxElem = new BN(MAX.toString(10), 10).toRed(bn128.q);

// Get a random BN in the bn128 curve group's reduction context
bn128.randomScalar = () => {
    return new BN(crypto.randomBytes(32), 16).toRed(bn128.q);
};

bn128.toHex = (x) => { // x is a BN (red)
    return "0x" + x.toString(16, 64);
};

bn128.toElem = (x) => { // x is in hex "0x...""
    return new BN(x.slice(2), 16).toRed(bn128.q);
};

bn128.serialize = (point) => {
    if (point.x == null && point.y == null)
        return ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000"];
    return [bn128.toHex(point.getX()), bn128.toHex(point.getY())];
};

bn128.unserialize = (serialization) => {
    if (serialization[0] == "0x0000000000000000000000000000000000000000000000000000000000000000" && serialization[1] == "0x0000000000000000000000000000000000000000000000000000000000000000")
        return bn128.zero;
    return bn128.curve.point(serialization[0].slice(2), serialization[1].slice(2)); // no check if valid curve point?
};

bn128.representation = (point) => {
    var temp = bn128.serialize(point);
    return temp[0].slice(2) + temp[1].slice(2);
};

module.exports = bn128;