const BLOCK_DELAY = 5000;

class Block {
    private transactions: string[] = [];

    constructor (public prevHash: string) {}

    addTransaction(transaction: string) {
        this.transactions.push(transaction);
    }

    toString() {
        return `Block ${this.prevHash}:\n\t\t\t\t${this.transactions.join('\n\t\t\t\t')}`;
    }
}

class Chain {
    public chain : Block[] = [];
    private nextBlock: Block | null = null;

    constructor () {}

    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction: string) {
        console.log('New transaction: ', transaction);
        this.getNextBlock().addTransaction(transaction);
    }

    private getNextBlock() {
        if (this.nextBlock)
            return this.nextBlock;
        else {
            this.nextBlock = new Block(Math.round(Math.random() * 100).toString());
            setTimeout(() => this.addNextBlockToChain(), BLOCK_DELAY);
            return this.nextBlock;
        }
    }

    private addNextBlockToChain() {
        this.chain.push(this.nextBlock!);
        console.log(`\nNew block added. Current chain state (${this.chain.length} blocks):\n`, this.toString(), '\n');
        this.nextBlock = null;
    }

    toString() {
        return `${this.chain.map(block => block.toString()).join('\n')}`;
    }
}

function sleep(n: number) {
    console.log(`\nsleeping for ${n}ms...\n`);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('awaiking...\n')
            resolve('');
        }, n)
    });
}

async function main() {
    const chain = new Chain();
    chain.addTransaction('meow');
    chain.addTransaction('woff');

    await sleep(2000);

    chain.addTransaction('second meow');
    chain.addTransaction('second woof');
    chain.addTransaction('some transaction');
    chain.addTransaction('some other transaction');
    await sleep(2000);
    chain.addTransaction('something in the way');
    chain.addTransaction('oooo wooo');
    await sleep(2000);
    chain.addTransaction('something in the way');
    chain.addTransaction('yeah');

    await sleep(2000);
}

main();