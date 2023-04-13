const EC = require('elliptic').ec
const SHA256 = require('crypto-js/sha256')
const uuidV1 = require('uuid')

const ec = new EC('secp256k1')

// noinspection JSValidateTypes
class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair()
    }

    static id() {
        return uuidV1.v1()
    }

    static hash(data) {
        return SHA256(data)
    }

    static verifySignature(publicKey, signature, dataHash) {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature)
    }
}

module.exports = ChainUtil