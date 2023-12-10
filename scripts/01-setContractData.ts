import { ethers, getNamedAccounts, deployments, network } from "hardhat"
import { UNIVERSAL_ID } from "../typechain-types"
import { developmentChains } from "../helper-hardhat-config"

async function main() {
    const { deployer } = await getNamedAccounts()
    console.log(deployer)
    const chainId: number = network.config.chainId!

    let universal_id: UNIVERSAL_ID

    universal_id = await ethers.getContract("UNIVERSAL_ID", deployer)
    console.log(`Got contract UNIVERSAL_ID at ${universal_id.target}`)

    // const setContractUri = await avatarNftMe.setContractURI(
    //     DESCRIPTION,
    //     IMAGE,
    //     LINK
    // )
    // await setContractUri.wait()

    // const setCurrentWebPageUri = await avatarNftMe.setCurrentWebPageUri(WEBPAGE)
    // await setCurrentWebPageUri.wait()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
