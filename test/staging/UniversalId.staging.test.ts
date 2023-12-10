import { assert } from "chai"
import { ethers, network } from "hardhat"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"

import { UNIVERSAL_ID } from "../../typechain-types"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", async function () {
          const chainId: number = network.config.chainId!

          let universal_id: UNIVERSAL_ID
          let deployer: any

          beforeEach(async function () {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]

              universal_id = await ethers.getContract("UNIVERSAL_ID", deployer)
          })

          describe("constructor", function () {
              it("sets the owner addresses correctly", async () => {
                  const response = await universal_id.owner
                  assert.equal(response, deployer.address)
              })
          })

          describe("view", function () {
              const INITIAL_COST = ethers.parseEther("50")
              const INCREMENT_THRESHOLD = ethers.parseUnits("50", 0)

              it("get initial price", async () => {})
          })
      })
