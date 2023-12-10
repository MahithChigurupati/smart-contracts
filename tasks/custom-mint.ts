import { task } from "hardhat/config"
import main from "../scripts/02-mint"

task("custom-mint", "mints an identity to user")
    .addParam("signer", "The signer's address")
    .addParam("firstname", "The signer's first name")
    .addParam("lastname", "The signer's last name")
    .addParam("dob", "The date of birth")
    .addParam("phone", "The phone number")
    .setAction(async (taskArgs, hre) => {
        // Convert DoB to timestamp
        const DoBTimestamp = Date.parse(taskArgs.dob)

        // Call main function with task arguments
        await main(hre, {
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

        console.log("Custom mint function completed")
    })

// export task
module.exports = {}
