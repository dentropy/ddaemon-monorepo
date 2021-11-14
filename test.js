
// Get string for elasticsearch index

// create folder for github team if it does not exist

// clone the code

// get the JSON

// Label the JSON correctly

// put JSON in the correct location labeled

// Dump to elasticsearch

const { execSync } = require("child_process");
const fs = require('fs');


async function get_single_commit_data(team_name, repo_name, tmp_commit){
    let commit_result = {
      "id":team_name + "." + repo_name + "." + tmp_commit,
      "hash": tmp_commit
    }
    var checkout_command = `cd tmpRepo && git log -n 1 --pretty=format:"%an" ` + tmp_commit
    commit_result.author_name  = await execSync(checkout_command).toString()
    checkout_command = `cd tmpRepo && git log -n 1 --pretty=format:"%ae" ` + tmp_commit
    commit_result.author_email = await execSync(checkout_command).toString()
    checkout_command = `cd tmpRepo && git log -n 1 --pretty=format:"%ad" ` + tmp_commit
    commit_result.author_date = await execSync(checkout_command).toString()
    checkout_command = `cd tmpRepo && git log -n 1 --pretty=format:"%s" ` + tmp_commit
    commit_result.subject = await execSync(checkout_command).toString()
    checkout_command = `cd tmpRepo && git diff-tree --no-commit-id --name-only -r ` + tmp_commit
    commit_result.files_changed = await execSync(checkout_command).toString().split("\n")
    commit_result.files_changed.pop()
    return(commit_result)
}

async function get_git_repo_metadata(repo_url){
    let team_name = repo_url.split("/")[3]
    let repo_name = repo_url.split("/")[4]
    // let git_clone_command = `git clone ${repo_url}.git tmpRepo`
    // await execSync(git_clone_command)
    let commit_hashes = await execSync("cd tmpRepo && git log --pretty=oneline").toString().split("\n")
    commit_hashes.pop()
    commit_hashes.reverse()
    console.log(commit_hashes)

    for(var i = 1; i < commit_hashes.length - 1; i++){
        let commit_metadata = await get_single_commit_data(team_name, repo_name, commit_hashes[i].split(" ")[0])
        var checkout_command = `cd tmpRepo && git diff --stat ${commit_hashes[i - 1].split(" ")[0]} ${commit_hashes[i].split(" ")[0]}`
        console.log(checkout_command)
        commit_metadata.lines_changed_raw  = await execSync(checkout_command).toString()

        commit_metadata.lines_added   = commit_metadata.lines_changed_raw.split("+").length - 1
        commit_metadata.lines_removed = commit_metadata.lines_changed_raw.split("-").length - 1
        console.log(commit_metadata)
    }
    // console.log(team_name)
    // console.log(repo_name)
}


get_git_repo_metadata("https://github.com/ethereum/EIPs")