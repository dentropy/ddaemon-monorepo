const export_repo = require("./get_git_repo_metadata")
const fs = require('fs');
let rawdata = JSON.parse(fs.readFileSync('gitrepos.json'));
console.log(rawdata);



console.log(export_repo("https://gitlab.com/dentropy/keybase-binding"))