import * as crypto from 'crypto';

function sleep(n: number) {
    console.log(`\nsleeping for ${n}ms...\n`);
    return new Promise(resolve => setTimeout(() => {
            console.log('\nawaking...\n');
            resolve('');
        }, n)
    )
}

class Transaction {
    constructor(
        public amount: number, 
        public payer: string, 
        public payee: string
    ) {}

    toString() {
        return `Transaction: {\n\tamount: ${this.amount},\n\tpayer: ${this.payer},\n\tpayee: ${this.payee}\n}\n`;
    }
}

class Block {
    private _transactions: Transaction[] = [];

    constructor(
        public prevHash: string,
        public timestamp = Date.now()
    ) {}

    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');
        hash.update(str).end();
        return hash.digest('hex');
    }

    get transactions() {
        return this._transactions;
    }

    addTransaction(transaction: Transaction) {
        this._transactions.push(transaction);
    }

    toString() {
        return `\nBlock ${this.timestamp}. Transactions: ${this._transactions.length}\n${this._transactions.map((t, i) => `${i + 1}.` + t.toString()).join('')}\n`;
    }
}

class Chain {
    public static instance = new Chain();

    private _chain: Block[];
    private _nextBlock: Block | null = null;

    constructor () {
        const block = new Block('');
        block.addTransaction(new Transaction(0, 'genesis', ''));
        this._chain = [block];
    }

    public get chain() {
        return this._chain;
    }

    private get lastBlock() {
        return this._chain[this._chain.length - 1];
    }

    addTransaction(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
        const verifier = crypto.createVerify('SHA256'); 
        verifier.update(transaction.toString()).end();
        
        const isValid = verifier.verify(senderPublicKey, signature);

        if (isValid) {
            console.log('Transaction confirmed: ', transaction);
            this.getNextBlock().addTransaction(transaction);
        }
    }

    private getNextBlock() {
        if (this._nextBlock)
            return this._nextBlock;
        else {
            this._nextBlock = new Block(this.lastBlock.hash);
            setTimeout(() => this.pushNextBlockToChain(), 1000);
            return this._nextBlock;
        }
    }

    private pushNextBlockToChain() {
        this.chain.push(this._nextBlock!);
        this._nextBlock = null;
    }

    toString() {
        return `\nChain, blocks: ${this.chain.length}\n${this.chain.map(block => block.toString()).join('----------------------------')}\n`
    }
}

class Wallet {
    public publicKey: string;
    private privateKey: string;

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

    sendMoney(amount: number, payeePublicKey: string) {
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