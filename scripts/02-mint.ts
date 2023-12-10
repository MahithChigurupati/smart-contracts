import { UNIVERSAL_ID } from "../typechain-types"
import * as circomlibjs from "circomlibjs"
import { Address } from "hardhat-deploy/types"
import addresses from "../constants/contractAddresses.json"

interface MainFunctionArgs {
    signer: string
    firstName: string
    lastName: string
    dob: number // Assuming dob is a string that will be converted to a timestamp
    phone: string
}

async function poseidonHash(inputs: any) {
    const poseidon = await circomlibjs.buildPoseidon()
    const poseidonHash = poseidon.F.toString(poseidon(inputs))
    return poseidonHash
}

async function mintIdentity(
    hre: any,
    signer: Address,
    fname: string,
    lname: string,
    dob: number,
    phone: string,
    universal_id: UNIVERSAL_ID,
) {
    const UID = hre.ethers.sha256(
        hre.ethers.toUtf8Bytes(signer + fname + lname + dob + phone),
    )
    const nameHash = hre.ethers.sha256(
        hre.ethers.toUtf8Bytes(signer + fname + lname),
    )

    const DoBHash = await poseidonHash([signer, dob])
    const phoneNumHash = hre.ethers.sha256(
        hre.ethers.toUtf8Bytes(signer + phone),
    )

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

async function main(
    hre: any,
    { signer, firstName, lastName, dob, phone }: MainFunctionArgs,
) {
    const { ethers, getNamedAccounts, network } = hre
    const { deployer, user } = await getNamedAccounts()
    const chainId = network.config.chainId!.toString()

    // Fetch the deployed contract address
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

    await mintIdentity(
        hre,
        signer,
        firstName,
        lastName,
        dob,
        phone,
        universal_id,
    )

    // Fetch the identity for confirmation (optional)
    const identity = await universal_id.getID(signer)
}

export default main

// npx hardhat custom-mint --signer 0x03fcDbb718cDDb25ab4c07D77e1511c5bbF5D126 --firstname John --lastname Doe --dob 01/01/2000 --phone +18576939706 --network sepolia

// async function verifyAgeProof(
//     address,
//     proof,
//     publicSignals,
//     dIdentityContract,
// ) {
//     const id = await dIdentityContract.getID(address)
//     const vKey = JSON.parse(fs.readFileSync("verification_key.json"))
//     const res = await snarkjs.groth16.verify(vKey, publicSignals, proof)
//     return res && id.dobHash == publicSignals[3]
// }

// const verification = await verifyAgeProof(
//     addr1.address,
//     proof,
//     publicSignals,
//     dIdentityContract,
// )
// console.log(verification)
