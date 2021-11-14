
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
    let commit_hashes = await execSync("cd tmpRepo && git log --pretty=oneline").toString().split("\n")
    console.log(commit_hashes)
    console.log(commit_hashes.length)
    for(var i = 0; i < commit_hashes.length; i++){
      commit_result = {
        "id":team_name + "." + repo_name + "." + commit_hashes[i].split(" ")[0],
        "hash": commit_hashes[i].split(" ")[0]
      }
      var checkout_command = `cd tmpRepo && git log -n 1 --pretty=format:"%an" ` + commit_hashes[i].split(" ")[0]
      commit_result.author_name  = await execSync(checkout_command).toString()
      checkout_command = `cd tmpRepo && git log -n 1 --pretty=format:"%ae" ` + commit_hashes[i].split(" ")[0]
      commit_result.author_email = await execSync(checkout_command).toString()
      checkout_command = `cd tmpRepo && git log -n 1 --pretty=format:"%ad" ` + commit_hashes[i].split(" ")[0]
      commit_result.author_date = await execSync(checkout_command).toString()
      checkout_command = `cd tmpRepo && git log -n 1 --pretty=format:"%s" ` + commit_hashes[i].split(" ")[0]
      commit_result.subject = await execSync(checkout_command).toString()
      checkout_command = `cd tmpRepo && git diff-tree --no-commit-id --name-only -r ` + commit_hashes[i].split(" ")[0]
      commit_result.files_changed = await execSync(checkout_command).toString().split("\n")
      commit_result.files_changed.pop()
      console.log(commit_result)
    }
    // console.log(team_name)
    // console.log(repo_name)
}


get_git_repo_metadata("https://github.com/ethereum/EIPs")