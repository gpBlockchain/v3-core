import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
require("dotenv").config();
const mnemonic_str = process.env.MNEMONIC_STR
const test_rpc_url = process.env.TEST_RPC


export default {
    networks: {
        hardhat: {
            allowUnlimitedContractSize: false,
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        ropsten: {
            url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        kovan: {
            url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        arbitrumRinkeby: {
            url: `https://arbitrum-rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        arbitrum: {
            url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        optimismKovan: {
            url: `https://optimism-kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        optimism: {
            url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        polygon: {
            url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
        localEth:{
            url:`http://localhost:8545`,
            // gas:3000000,
            accounts: {
                mnemonic: "test test test test test test test test test test test junk",
                path: "m/44'/60'/0'/0",
                initialIndex: 2,
                count: 1,
                passphrase: "",
            },
        },
        testRpc:{
            url:test_rpc_url,
            // gas:3000000,
            // gas:10000000,
            gasMultiplier:2,

            accounts: {
                mnemonic: mnemonic_str,
                path: "m/44'/60'/0'/0",
                initialIndex: 5,
                count: 5,
                passphrase: "",
            },
        }
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    solidity: {
        version: '0.7.6',
        settings: {
            optimizer: {
                enabled: true,
                runs: 800,
            },
            metadata: {
                // do not include the metadata hash, since this is machine dependent
                // and we want all generated code to be deterministic
                // https://docs.soliditylang.org/en/v0.7.6/metadata.html
                bytecodeHash: 'none',
            },
        },
    },
    defaultNetwork:"testRpc",
    mocha: {
        /** Reporter name or constructor. */
        reporter: "mochawesome",
        timeout: 5000000,
        reporterOptions: {
            reportFilename: "[status]_[datetime]-UniswapV3Pool.1.2-report",
        }
        // /** Reporter settings object. */
        // reporterOptions: {
        //     output: "test-results-1.json"
        // },
        // reporterOptions: {
        //     reportFilename: "[status]_[datetime]-[name]-report",
        //     timestamp: "longDate"
        // }
        // mochawesome:{
        //     reporterOptions: {
        //         reportFilename: "[status]_[datetime]-[name]-report",
        //         timestamp: "longDate"
        //     }
        // }

    }

}
