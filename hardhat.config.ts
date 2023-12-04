import { HardhatUserConfig } from "hardhat/config"
import hre from "hardhat"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-ethers"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "@nomiclabs/hardhat-solhint"
import "hardhat-gas-reporter"
import "hardhat-contract-sizer"
import "./tasks/custom-mint"

import dotenv from "dotenv"

dotenv.config()

// RPC URLS
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || ""

// PRIVATE KEYS
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || ""

// API KEYS
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },

    networks: {
        hardhat: {
            chainId: 1337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            chainId: 11155111,
            accounts: [SEPOLIA_PRIVATE_KEY],
        },
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },

    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        // token: "MATIC",
    },
    contractSizer: {
        runOnCompile: true,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}

export default config
