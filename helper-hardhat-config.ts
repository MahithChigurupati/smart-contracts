export interface networkConfigItem {
    name?: string
    blockConfirmations?: number
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    1337: {
        name: "hardhat",
        blockConfirmations: 0,
    },
    11155111: {
        name: "sepolia",
        blockConfirmations: 6,
    },
}

export const developmentChains = ["hardhat"]
export const testnetChains = ["sepolia"]

export const frontEndContractsFile = "./constants/contractAddresses.json"
export const frontEndAbiFile = "./constants/abi.json"

export const ContractsFile = "../core-server/constants/contractAddresses.json"
export const AbiFile = "../core-server/constants/abi.json"

export const addressesFile = "./constants/addresses.json"
