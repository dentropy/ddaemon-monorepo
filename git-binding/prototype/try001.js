// Get string for elasticsearch index

// create folder for github team if it does not exist

// clone the code

// get the JSON

// Label the JSON correctly

// put JSON in the correct location labeled

// Dump to elasticsearch

const { execSync } = require("child_process");
const fs = require('fs');

async function get_git_repo_metadata(repo_url){
    let team_name = repo_url.split("/")[3]
    let repo_name = repo_url.split("/")[4]
    // let git_clone_command = `git clone ${repo_url}.git tmpRepo`
    // await execSync(git_clone_command)
    // await execSync("bash git.sh")
    let passed = false
    while (!passed){
      try {
        let rawdata = JSON.parse(fs.readFileSync('test.json'));
        passed = true
      } catch(e) {
        let tmp_split_string = e.toString().split(" ")
        let position_to_fix = Number(tmp_split_string[tmp_split_string.length - 1]) -1
        let json_to_fix = fs.readFileSync('test.json').toString()
        if(json_to_fix[position_to_fix] != '"'){
          position_to_fix = Number(tmp_split_string[tmp_split_string.length - 1]) + 1
        }
        console.log(json_to_fix[position_to_fix])
        if(json_to_fix[position_to_fix] == '"'){
          //var minusOneStr = json_to_fix.replace(json_to_fix[position_to_fix], ' ');
          var minusOneStr = json_to_fix.substring(0, position_to_fix) + "" + json_to_fix.substring(position_to_fix + 1);
          await fs.writeFileSync( 'test.json', minusOneStr )
          console.log(position_to_fix)
          console.log(typeof(position_to_fix))
        }
        else{
          console.log(e)
          passed = true
          console.log("We got a problem")
        }
      }
    }
    // console.log(team_name)
    // console.log(repo_name)
}


get_git_repo_metadata("https://github.com/ethereum/EIPs")