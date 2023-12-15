import { task } from "hardhat/config"
import mintScript02 from "../scripts/02-mint"
import mintScript03 from "../scripts/03-mint"

task("custom-mint", "mints an identity to user")
    .addParam("id", "The id type")
    .addParam("signer", "The signer's address")
    .addParam("firstname", "The signer's first name")
    .addParam("lastname", "The signer's last name")
    .addParam("dob", "The date of birth")
    .addParam("phone", "The phone number")
    .setAction(async (taskArgs, hre) => {
        const DoBTimestamp = Date.parse(taskArgs.dob)

        console.log(taskArgs.id)

        if (taskArgs.id == "SSA") {
            await mintScript03(hre, {
                signer: taskArgs.signer,
                firstName: taskArgs.firstname,
                lastName: taskArgs.lastname,
                dob: DoBTimestamp,
                phone: taskArgs.phone,
            })
                .then(() => process.exit(0))
                .catch((error: any) => {
                    console.error(error)
                    process.exit(1)
                })
        } else {
            await mintScript02(hre, {
                signer: taskArgs.signer,
                firstName: taskArgs.firstname,
                lastName: taskArgs.lastname,
                dob: DoBTimestamp,
                phone: taskArgs.phone,
            })
                .then(() => process.exit(0))
                .catch((error: any) => {
                    console.error(error)
                    process.exit(1)
                })
        }

        console.log("Custom mint function completed")
    })

module.exports = {}
