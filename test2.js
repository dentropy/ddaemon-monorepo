const { exec, execSync } = require("child_process");

async function doAsync(){
  await execSync("rm -rf tmpRepo").toString()

}

doAsync()
