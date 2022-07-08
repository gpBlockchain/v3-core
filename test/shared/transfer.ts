import {BigNumber, Wallet} from "ethers";
import {Provider} from "@ethersproject/abstract-provider";


export async function transfer(privateKey: string,provider: Provider, to: string,value:string|BigNumber) {
    if((await provider.getBalance(to)).sub(value).gte(BigNumber.from('0'))){
        return
    }
    // init sign
    let wt = new Wallet(privateKey)
    wt = await wt.connect(provider)

    while (true){
        try {
            let tx = await wt.sendTransaction({
                to:to,
                value:value
            })
            await tx.wait()
            if((await provider.getBalance(to)).sub(value).gte(BigNumber.from('0'))){
                return
            }
        }catch (e){
            console.log('e:',e.toString())
        }

    }

}