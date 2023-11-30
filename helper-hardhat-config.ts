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

export const DECIMALS = "18"

// export const MINT_FEE = ethers.parseEther("0.1")
// export const ONE = ethers.parseUnits("1", 0)
