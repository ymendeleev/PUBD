const crypto = require('crypto');
const secp256k1 = require('secp256k1');
// or require('secp256k1/elliptic')
//   if you want to use pure js implementation in node
//test comment to github reload
// generate message to sign
// message should have 32-byte length, if you have some other length you can hash message
// for example `msg = sha256(rawMessage)`
const msg = crypto.randomBytes(32);

var hash = crypto.createHash('sha256').update(msg).digest(); 
console.log("msg = " + msg);
console.log("hash = " + hash.toString("hex"));

// generate privKey
let privKey
do {
  privKey = crypto.randomBytes(32)
} while (!secp256k1.privateKeyVerify(privKey));

// get the public key in a compressed format
const pubKey = secp256k1.publicKeyCreate(privKey);

// sign the message
const sigObj = secp256k1.ecdsaSign(hash, privKey);

// verify the signature
console.log(secp256k1.ecdsaVerify(sigObj.signature, hash, pubKey));
// => true


console.log ("privkey = " + privKey);
console.log ("publickey = " + pubKey);
console.log ("sign = " + sigObj);
