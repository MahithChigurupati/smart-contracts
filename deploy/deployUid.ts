import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

import verify from "../utils/verify"
import { networkConfig, developmentChains } from "../helper-hardhat-config"

const deployUniversalId: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number = network.config.chainId!

    log("----------------------------------------------------")
    log("Deploying UNIVERSAL_ID and waiting for confirmations...")

    const args = [""]
    const universal_id = await deploy("UNIVERSAL_ID", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[chainId].blockConfirmations || 0,
    })

    log(`universal_id deployed at ${universal_id.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(universal_id.address, args)
    }
}
export default deployUniversalId
deployUniversalId.tags = ["all", "universal_id"]
