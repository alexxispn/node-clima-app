import inquirer from "inquirer";
import colors from "colors";

colors.enable();

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Find a city`
            },
            {
                value: 2,
                name: `${'2.'.green} History`
            },
            {
                value: 0,
                name: `${'0.'.green} Exit`
            }
        ]
    }
];

export const inquirerMenu = async () => {
    console.clear();
    console.log("================================".green);
    console.log("  Select an option".white);
    console.log("================================\n".green);

    const {option} = await inquirer.prompt(questions);
    return option;
}

export const pause = async () => {
    const continueMessage = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`
        }
    ];
    console.log("\n");
    await inquirer.prompt(continueMessage);
}

export const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Please enter a value";
                }
                return true;
            }
        }
    ];
    const {description} = await inquirer.prompt(question);
    return description;
}

export const listPlaces = async (places = []) => {
    const choices = places.map((place, i) => {
        const idx = `${i + 1}`;
        return {
            value: place.id,
            name: `${(idx + '.').green} ${place.name}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a place',
            choices
        }
    ];
    const {id} = await inquirer.prompt(questions);
    return id;
}

export const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

export const showChecklist = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`;
        return {
            value: task.id,
            name: `${(idx + '.').green} ${task.description}`,
            checked: !!(task.completed)
        }
    });
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ];
    const {ids} = await inquirer.prompt(question);
    return ids;
}
