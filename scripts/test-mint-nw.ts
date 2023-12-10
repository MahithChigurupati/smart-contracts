import { ethers, getNamedAccounts, deployments, network } from "hardhat"
import { UNIVERSAL_ID } from "../typechain-types"
import { developmentChains } from "../helper-hardhat-config"
import * as circomlibjs from "circomlibjs"
import { Address } from "hardhat-deploy/types"
import addresses from "../constants/contractAddresses.json"

async function poseidonHash(inputs: any) {
    const poseidon = await circomlibjs.buildPoseidon()
    const poseidonHash = poseidon.F.toString(poseidon(inputs))
    return poseidonHash
}

async function mintIdentity(
    signer: Address,
    fname: string,
    lname: string,
    dob: number,
    phone: string,
    universal_id: UNIVERSAL_ID,
) {
    const UID = ethers.sha256(
        ethers.toUtf8Bytes(signer + fname + lname + dob + phone),
    )
    const nameHash = ethers.sha256(ethers.toUtf8Bytes(signer + fname + lname))
    const DoBHash = await poseidonHash([signer, dob])
    const phoneNumHash = ethers.sha256(ethers.toUtf8Bytes(signer + phone))

    const identity = {
        UID: UID,
        nameHash: nameHash,
        dobHash: DoBHash,
        phone: phoneNumHash,
    }

    console.log(identity)

    const tx = await universal_id.mint(signer, identity)
    await tx.wait()
}

async function main() {
    const { deployer, user } = await getNamedAccounts()
    console.log(user)
    const chainId: number = network.config.chainId!

    // let universal_id: UNIVERSAL_ID
    // if (developmentChains.includes(network.name)) {
    //     console.log("Deploying UNIVERSAL_ID contract to local network")
    //     await deployments.fixture(["all"])
    // }

    // universal_id = await ethers.getContract("UNIVERSAL_ID", deployer)
    // console.log(`Got contract UNIVERSAL_ID at ${universal_id.target}`)

    //@ts-ignore
    const universalIdAddress = addresses[chainId][0]
    if (!universalIdAddress) {
        console.error(`No address found for chain ID ${chainId}`)
        process.exit(1)
    }
    const universal_id = await ethers.getContractAt(
        "UNIVERSAL_ID",
        universalIdAddress,
    )

    console.log(universal_id.target)

    const firstName = "John"
    const lastName = "Doe"
    const DoB = "01/01/2000"
    const DoBTimestamp = Date.parse(DoB)
    const phone = "+18578578587"
    await mintIdentity(
        deployer,
        firstName,
        lastName,
        DoBTimestamp,
        phone,
        universal_id,
    )

    const identity = await universal_id.getID(deployer)
    console.log("identity ->", identity)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
