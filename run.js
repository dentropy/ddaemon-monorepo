const { exec, execSync } = require("child_process");

async function doAsync(){
    var stdout = await execSync("git show-branch")
    let branch_name = stdout.toString().split("[")[1].split("]")[0]

}

//doAsync()

const fs = require('fs');
let rawdata = JSON.parse(fs.readFileSync('test.json'));
console.log(rawdata);