import {readInput} from "./helpers/inquirer.js";


const main = async () => {
    const answer = await readInput("What's your name?");
    console.log(`Hi ${answer}!`);
}

main().then(r => console.log("Done!"));
