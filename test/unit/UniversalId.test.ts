import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { network, deployments, ethers } from "hardhat"
import {
    developmentChains,
    // ONE,
    // MINT_FEE,
} from "../../helper-hardhat-config"
import { UNIVERSAL_ID } from "../../typechain-types"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("UNIVERSAL_ID", function () {
          let universalId: UNIVERSAL_ID

          let deployer: SignerWithAddress
          let user: SignerWithAddress

          const FIRST_NAME = "John"
          const LAST_NAME = "Doe"

          beforeEach(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              user = accounts[1]

              await deployments.fixture(["all"])
              universalId = await ethers.getContract("UNIVERSAL_ID", deployer)
          })

          describe("constructor", function () {
              it("sets the owner addresses correctly", async () => {
                  const response = await universalId.owner()
                  assert.equal(response, deployer.address)
              })

              it("sets the native chain address correctly", async () => {})
          })

          describe("Contract Level Metdata", function () {
              it("sets the webpage correctly", async () => {})
          })

          describe("Mint NFT", function () {
              it("mint an NFT with native chain currency", async () => {})
          })

          describe("Miscellaneous ", function () {
              it("add support for a new token", async () => {})
          })

          describe("view", function () {
              it("get initial price", async () => {})
          })
      })
