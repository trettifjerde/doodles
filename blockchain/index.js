"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
function sleep(n) {
    console.log(`\nsleeping for ${n}ms...\n`);
    return new Promise(resolve => setTimeout(() => {
        console.log('\nawaking...\n');
        resolve('');
    }, n));
}
class Transaction {
    constructor(amount, payer, payee) {
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
    }
    toString() {
        return `Transaction: {\n\tamount: ${this.amount},\n\tpayer: ${this.payer},\n\tpayee: ${this.payee}\n}\n`;
    }
}
class Block {
    constructor(prevHash, timestamp = Date.now()) {
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this._transactions = [];
    }
    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');
        hash.update(str).end();
        return hash.digest('hex');
    }
    get transactions() {
        return this._transactions;
    }
    addTransaction(transaction) {
        this._transactions.push(transaction);
    }
    toString() {
        return `\nBlock ${this.timestamp}. Transactions: ${this._transactions.length}\n${this._transactions.map((t, i) => `${i + 1}.` + t.toString()).join('')}\n`;
    }
}
class Chain {
    constructor() {
        this._nextBlock = null;
        const block = new Block('');
        block.addTransaction(new Transaction(0, 'genesis', ''));
        this._chain = [block];
    }
    get chain() {
        return this._chain;
    }
    get lastBlock() {
        return this._chain[this._chain.length - 1];
    }
    addTransaction(transaction, senderPublicKey, signature) {
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString()).end();
        const isValid = verifier.verify(senderPublicKey, signature);
        if (isValid) {
            console.log('Transaction confirmed: ', transaction);
            this.getNextBlock().addTransaction(transaction);
        }
    }
    getNextBlock() {
        if (this._nextBlock)
            return this._nextBlock;
        else {
            this._nextBlock = new Block(this.lastBlock.hash);
            setTimeout(() => this.pushNextBlockToChain(), 1000);
            return this._nextBlock;
        }
    }
    pushNextBlockToChain() {
        this.chain.push(this._nextBlock);
        this._nextBlock = null;
    }
    toString() {
        return `\nChain, blocks: ${this.chain.length}\n${this.chain.map(block => block.toString()).join('----------------------------')}\n`;
    }
}
Chain.instance = new Chain();
class Wallet {
    constructor() {
        const keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            },
        });
        this.publicKey = keypair.publicKey;
        this.privateKey = keypair.privateKey;
    }
    sendMoney(amount, payeePublicKey) {
        const transaction = new Transaction(amount, this.publicKey, payeePublicKey);
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end;
        const signature = sign.sign(this.privateKey);
        Chain.instance.addTransaction(transaction, this.publicKey, signature);
    }
}
async function main() {
    const satoshi = new Wallet();
    const muhsik = new Wallet();
    const kesak = new Wallet();
    satoshi.sendMoney(100, muhsik.publicKey);
    muhsik.sendMoney(50, kesak.publicKey);
    await sleep(500);
    satoshi.sendMoney(100, kesak.publicKey);
    kesak.sendMoney(200, muhsik.publicKey);
    await sleep(500);
    satoshi.sendMoney(100, muhsik.publicKey);
    muhsik.sendMoney(50, kesak.publicKey);
    satoshi.sendMoney(100, kesak.publicKey);
    kesak.sendMoney(200, muhsik.publicKey);
    await sleep(500);
    satoshi.sendMoney(100, muhsik.publicKey);
    muhsik.sendMoney(50, kesak.publicKey);
    satoshi.sendMoney(100, kesak.publicKey);
    kesak.sendMoney(200, muhsik.publicKey);
    await sleep(5000);
    console.log(Chain.instance.toString());
}
main();
