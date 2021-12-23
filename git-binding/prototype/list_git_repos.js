const { exec, execSync } = require("child_process");

async function doAsync(){
    var stdout = await execSync("git show-branch")
    let branch_name = stdout.toString().split("[")[1].split("]")[0]

}

//doAsync()

const fs = require('fs');
const urlRegex = require('url-regex');
let rawdata = fs.readFileSync('coins_enriched.json').toString()
//rawdata.replace("\\/\\/", "\\");
console.log("Data Loaded")
let tmp_urls = rawdata.match(urlRegex())
console.log("Got tmp_urls")
new_urls = []
console.log(new_urls)
tmp_urls.forEach((my_url) => {
  if(my_url.indexOf("github") > -1)
  {
    console.log(my_url)
    new_urls.push(my_url)
  }
})
console.log(new_urls)
fs.writeFileSync("gitrepos.json", JSON.stringify(new_urls))
// let http_regex = "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
// var myRe = new RegExp(http_regex);
// var myArray = myRe.exec(rawdata);
// console.log(myArray)
// console.log ( rawdata.split("github").length )

// let test = "https:\/\/www.tokocrypto.com\/trade\/SCUSDT"
// console.log(test.replace("\\/\\/", "\\"))