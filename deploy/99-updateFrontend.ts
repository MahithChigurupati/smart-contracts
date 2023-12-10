import {
    frontEndContractsFile,
    frontEndAbiFile,
    ContractsFile,
    AbiFile,
} from "../helper-hardhat-config"
import fs from "fs"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const updateUI: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment,
) {
    const { network, ethers } = hre
    const chainId = "31337"

    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        const universal_id = await ethers.getContract("UNIVERSAL_ID")
        const contractAddresses = JSON.parse(
            fs.readFileSync(frontEndContractsFile, "utf8"),
        )
        if (chainId in contractAddresses) {
            if (
                !contractAddresses[network.config.chainId!].includes(
                    universal_id.target,
                )
            ) {
                contractAddresses[network.config.chainId!].push(
                    universal_id.target,
                )
            }
        } else {
            contractAddresses[network.config.chainId!] = [universal_id.target]
        }
        fs.writeFileSync(
            frontEndContractsFile,
            JSON.stringify(contractAddresses),
        )
        fs.writeFileSync(
            frontEndAbiFile,
            JSON.stringify(universal_id.interface.fragments),
        )
        fs.writeFileSync(ContractsFile, JSON.stringify(contractAddresses))
        fs.writeFileSync(
            AbiFile,
            JSON.stringify(universal_id.interface.fragments),
        )
        console.log("Front end written!")
    }
}
export default updateUI
updateUI.tags = ["all", "frontend"]
