import inquirer from "inquirer";
import chalk from "chalk";

const apiLink : string = "https://opentdb.com/api.php?amount=6&category=9&difficulty=medium&type=multiple"

let fetchData = async (data : string) => {
    let fetchQuiz : any = await fetch(data)
    let response = await fetchQuiz.json()
    return response.results;
};

let data = await fetchData(apiLink);

let startQuiz = async () => {
    let score: number = 0;
    // for username
    let name = await inquirer.prompt({
        type: "input",
        name: "fName",
        message: "what is your name?",
    })

    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer]
        
        let ans = await inquirer.prompt({
            type:"list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val: any) => val),  
        });
        
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.blue ("correct"));
            console.log(`Correct Answer is ${chalk.bold.italic.red (data[i].correct_answer)}`);
            
            
        }
    }  
    console.log(`Dear ${chalk.green.bold(name.fName)}, Your Score is ${chalk.red.bold(score)}, Out Of ${chalk.red.bold("5")}`);
    
};

startQuiz()




// let a = await inquirer.prompt({
    // type: "input",
    // name: "fname",
    // message: "what is your name"
// })

// console.log(chalk.bold.blue(a.fname));