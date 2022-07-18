import {ethers} from "hardhat";
import {transfer} from "../shared/transfer.js";
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
    for (let i = 0; i < signer.length; i++) {
        // @ts-ignore
        let aa = transfer(private_key, signer[0].provider, signer[i].address, ethers.utils.parseEther(transfer_value))
        waitList.push(aa)
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