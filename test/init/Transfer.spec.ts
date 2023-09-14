import {ethers} from "hardhat";
import {BigNumber, BigNumberish, Wallet} from "ethers";
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY
const TRANSFER_ETHER = process.env.TRANSFER_ETHER

describe('Transfer', function () {
    this.timeout(1000000)


    it('initAccount', async () => {

        // @ts-ignore
        await initWithParam(PRIVATE_KEY,TRANSFER_ETHER)
        console.log('init finish')
        let signers = await ethers.getSigners()
        console.log('account length:',signers.length)
        let waitList = []
        for (let i = 0; i < signers.length; i++) {
            // @ts-ignore
            let balance =  signers[0].provider.getBalance(signers[i].address)
            waitList.push({address:signers[i].address,balance:balance})
            await sleep(50)
        }
        for (let i = 0; i < waitList.length; i++) {
            console.log('idx:',i,' address:', waitList[i].address,' balance:',(await waitList[i].balance).toString())
        }

    })


})


async function initWithParam(private_key: string, transfer_value: string) {
    let signer = await ethers.getSigners()
    let waitList = []
    let provider = (await ethers.getSigners())[0].provider
    if (!provider) {
        console.log('Provider is undefined')
        return
    }

    let wt = new Wallet(private_key)
    wt = wt.connect(provider)
    let baseNonce = await provider.getTransactionCount(wt.address)
    let j = 0
    const transferValue = ethers.utils.parseEther(transfer_value)

    for (let i = 0; i < signer.length; i++) {
        let currentBalance = await provider.getBalance(signer[i].address)
        if(currentBalance.sub(transferValue).lt(BigNumber.from('0'))) {
            let currentNonce = baseNonce + j
            let aa = transfer(wt, i, signer[i].address, transferValue, currentNonce)
            waitList.push(aa)
            j++
        }
        await sleep(100)
    }
    for (let i = 0; i < waitList.length; i++) {
        await waitList[i]
    }
    return true
}

async function sleep(ms:number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}



export async function transfer(wt: Wallet, idx: number, to: string, value: BigNumberish, currentNonce: number) {
    let provider = (await ethers.getSigners())[idx].provider
    if(provider == undefined){
        console.log('provider is undefined')
        return
    }

    while (true){
        try {
            let tx = await wt.sendTransaction({
                to:to,
                value:value,
                nonce:currentNonce
            })
            await tx.wait()
            break;
        }catch (e){
            console.log('e:',e.toString())
        }
    }
}
