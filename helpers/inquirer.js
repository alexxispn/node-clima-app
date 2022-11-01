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
                value: '1',
                name: `${'1.'.green} Create task`
            },
            {
                value: '2',
                name: `${'2.'.green} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.green} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.green} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.green} Complete task(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Delete task`
            },
            {
                value: '0',
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

export const listTasksDelete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`;
        return {
            value: task.id,
            name: `${(idx + '.').green} ${task.description} -> ${task.completed
                ? "Completed".green
                : "Pending".red}`
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
            message: 'Delete',
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
