const prompt = require('prompt');
const fs = require("fs");

const properties = [
    {
        name: 'projectName',
        description: 'Enter your project name',
        type: 'string',
    },
    {
        name: 'projectDescription',
        description: 'Enter your project description',
        type: 'string',
    },
    {
        name: 'projectInstructions',
        description: 'Enter your project instructions',
        type: 'string',
    },
];

main();

function main(){
    console.log('Welcome to the Readme Maker, please follow the instructions');
    
    prompt.start();
    
    prompt.get(properties, async function (err, result) {
        if (err) { return onErr(err); }
        const answerResult = result;
        await makeReadme(answerResult)
        return;
    });
}

function onErr(err) {
    console.log(err);
    return 1;
}

async function makeReadme(answers){
    console.log(answers);
    fs.readFile('template.md', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        let result = data;
        result = result.replace(/projectName/g, answers.projectName);
        result = result.replace(/projectDescription/g, answers.projectDescription);
        result = result.replace(/projectInstructions/g, answers.projectInstructions);
      
        fs.writeFileSync("output/README.MD", result,function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("README.MD saved");
        });
      });

};