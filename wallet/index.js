const {DEFAULT_BALANCE} = require("../config");
const ChainUtils = require("../chain-util");

class Wallet {
    constructor() {
        this.balance = DEFAULT_BALANCE
        this.keyPair = ChainUtils.genKeyPair()
        this.publicKey = this.keyPair.getPublic().encode('hex')
    }

    toString() {
        return `Wallet ${new Date().toLocaleString()} -
            Balance: ${this.balance}
            PublicKey: ${this.publicKey.toString()}
        `
    }
}

module.exports = Wallet