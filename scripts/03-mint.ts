import { SSA_ID } from "../typechain-types"
import * as circomlibjs from "circomlibjs"
import { Address } from "hardhat-deploy/types"
import addresses from "../constants/addresses.json"

interface MainFunctionArgs {
    signer: string
    firstName: string
    lastName: string
    dob: number
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
    ssa_id: SSA_ID,
) {
    //@ts-ignore
    const universalIdAddress = addresses["11155111"][0]
    const UID = hre.ethers.sha256(
        hre.ethers.toUtf8Bytes(
            signer + fname + lname + dob + phone + universalIdAddress,
        ),
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

    const tx = await ssa_id.mint(signer, identity)
    await tx.wait()
}

async function mintScript03(
    hre: any,
    { signer, firstName, lastName, dob, phone }: MainFunctionArgs,
) {
    const { ethers, getNamedAccounts, network } = hre
    const { deployer, user } = await getNamedAccounts()
    const chainId = network.config.chainId!.toString()

    //@ts-ignore
    const universalIdAddress = addresses[chainId][0]
    if (!universalIdAddress) {
        console.error(`No address found for chain ID ${chainId}`)
        process.exit(1)
    }
    const ssa_id = await ethers.getContractAt("SSA_ID", universalIdAddress)

    await mintIdentity(hre, signer, firstName, lastName, dob, phone, ssa_id)

    const identity = await ssa_id.getID(signer)
}

export default mintScript03
