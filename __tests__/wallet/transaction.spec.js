const Transaction = require('../../wallet/transaction')
const Wallet = require('../../wallet')

describe('Transaction', () => {

    let transaction, wallet, recipient, amount

    beforeEach(() => {
        wallet = new Wallet()
        recipient = 'long string'
        amount = 50
        transaction = Transaction.newTransaction(wallet, recipient, amount)
    })

    it('outputs the amount subtracted from the wallet balance', () => {
        console.log(wallet.publicKey)
        console.log(transaction.outputs)

        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount)
    })

    it('outputs the amount added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
            .toEqual(amount)
    })

    it('input the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance)
    })

    it('validates a valid transaction', () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true)
    })

    it('invalidates a corrupted transaction', () => {
        transaction.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false)
    })

    describe('transaction with an amount that exceeds that balance', () => {
        beforeEach(() => {
            amount = 50000
            transaction = Transaction.newTransaction(wallet, recipient, amount)
        })

        it('does not create a transactions', () => {
            expect(transaction).toEqual(undefined)
        })
    })
})