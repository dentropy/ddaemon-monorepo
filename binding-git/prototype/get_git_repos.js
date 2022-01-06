const export_repo = require("./get_git_repo_metadata")
const fs = require('fs');
let rawdata = JSON.parse(fs.readFileSync('gitrepos.json'));

async function doAsync() {
  console.log(rawdata);
  console.log(rawdata.length);
  for(var i = 0; i < rawdata.length; i++){
    await export_repo(rawdata[i])
  }
}

doAsync()