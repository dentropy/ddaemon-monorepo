
// Get string for elasticsearch index

// create folder for github team if it does not exist

// clone the code

// get the JSON

// Label the JSON correctly

// put JSON in the correct location labeled

// Dump to elasticsearch

const { execSync } = require("child_process");
const fs = require('fs');


let export_dir = "./exports"
if (!fs.existsSync(export_dir)){
    fs.mkdirSync(export_dir, { recursive: true });
}


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
    commit_result.num_files_changed = commit_result.files_changed.length - 1
    commit_result.files_changed.pop()
    return(commit_result)
}

async function get_git_repo_metadata(repo_url){
    let team_name = repo_url.split("/")[3]
    let repo_name = repo_url.split("/")[4]
    let run_git_clone = await execSync(`git clone ${repo_url}.git tmpRepo`).toString().split("\n")
    let commit_hashes = await execSync("cd tmpRepo && git log --pretty=oneline").toString().split("\n")
    commit_hashes.pop()
    commit_hashes.reverse()
    console.log(commit_hashes)
    let repo_metadata = []
    for(var i = 1; i < commit_hashes.length - 1; i++) {
        let commit_metadata = await get_single_commit_data(team_name, repo_name, commit_hashes[i].split(" ")[0])
        var checkout_command = `cd tmpRepo && git diff --stat ${commit_hashes[i - 1].split(" ")[0]} ${commit_hashes[i].split(" ")[0]}`
        commit_metadata.lines_changed_raw  = await execSync(checkout_command).toString()
        commit_metadata.lines_added   = commit_metadata.lines_changed_raw.split("+").length - 1
        commit_metadata.lines_removed = commit_metadata.lines_changed_raw.split("-").length - 1
        console.log(checkout_command)
        console.log(commit_metadata)
        repo_metadata.push(commit_metadata)
        await execSync("rm -rf tmpRepo").toString()
    }
    fs.writeFileSync(`${export_dir}/${team_name}.${repo_name}.json`, JSON.stringify(repo_metadata));

}


//get_git_repo_metadata("https://github.com/ethereum/EIPs")

module.exports = get_git_repo_metadata;
