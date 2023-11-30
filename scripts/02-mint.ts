import { ethers, getNamedAccounts, deployments, network } from "hardhat"
import { UNIVERSAL_ID } from "../typechain-types"
import { developmentChains } from "../helper-hardhat-config"

async function main() {
    const { deployer } = await getNamedAccounts()
    console.log(deployer)
    const chainId: number = network.config.chainId!

    let universal_id: UNIVERSAL_ID
    if (developmentChains.includes(network.name)) {
        console.log("Deploying UNIVERSAL_ID contract to local network")
        await deployments.fixture(["all"])
    }

    universal_id = await ethers.getContract("UNIVERSAL_ID", deployer)
    console.log(`Got contract UNIVERSAL_ID at ${universal_id.target}`)

    // const tokenCounter = await avatarNftMe.getTokenCounter()

    const FIRST_NAME = "John"
    const LAST_NAME = "Doe"

    const MINT_FEE = ethers.parseEther("0.1")
    // const transactionResponse = await avatarNftMe.formTokenUriAndMint(
    //     FIRST_NAME,
    //     LAST_NAME,

    //     { value: MINT_FEE }
    // )
    // await transactionResponse.wait()

    // const holder = await avatarNftMe.ownerOf(tokenCounter)
    // console.log(`Minted token ${tokenCounter} to ${holder}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
