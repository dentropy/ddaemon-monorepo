const { exec, execSync } = require("child_process");
const del = require('del');
async function doAsync(){
  let please_delete = await  del(["tmpRepo"]);

}

doAsync()
