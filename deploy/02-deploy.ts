import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

import verify from "../utils/verify"
import { networkConfig, developmentChains } from "../helper-hardhat-config"

const deploySSAId: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment,
) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number = network.config.chainId!

    log("----------------------------------------------------")
    log("Deploying UNIVERSAL_ID and waiting for confirmations...")

    const args: any = []
    const ssa_id = await deploy("SSA_ID", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[chainId].blockConfirmations || 0,
    })

    log(`ssa_id deployed at ${ssa_id.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(ssa_id.address, args)
    }
}
export default deploySSAId
deploySSAId.tags = ["all", "ssa_id"]
