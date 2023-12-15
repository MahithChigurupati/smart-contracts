import { addressesFile } from "../helper-hardhat-config"
import fs from "fs"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const update: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { network, ethers } = hre
    const chainId = "31337"

    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        const ssa_id = await ethers.getContract("SSA_ID")
        const addr = JSON.parse(fs.readFileSync(addressesFile, "utf8"))
        if (chainId in addr) {
            if (!addr[network.config.chainId!].includes(ssa_id.target)) {
                addr[network.config.chainId!].push(ssa_id.target)
            }
        } else {
            addr[network.config.chainId!] = [ssa_id.target]
        }
        fs.writeFileSync(addressesFile, JSON.stringify(addr))

        console.log("Front end written!")
    }
}
export default update
update.tags = ["all", "front"]
