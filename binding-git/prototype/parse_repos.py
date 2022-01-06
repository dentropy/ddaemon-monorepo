import json
import subprocess
import glob
from glob import glob
list_of_git_repos = glob("./git_repos/*/")
print(list_of_git_repos)
output_path = "./json_out"
def get_commit(team_name, repo_name, repo_path, commit_hash):
    commit_metadata = {
      "id": team_name + "." + repo_name + "." + commit_hash,
      "hash": commit_hash
    }
    command = 'cd ' + repo_path + ' && git log -n 1 --pretty=format:"%an" ' + str(commit_hash)
    # print(command)
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    commit_output = str(process.communicate()[0])[2:-1]
    commit_metadata["author_name"] = commit_output

    command = 'cd ' + repo_path + ' && git log -n 1 --pretty=format:"%ae" ' + str(commit_hash)
    # print(command)
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    commit_output = str(process.communicate()[0])[2:-1]
    commit_metadata["author_email"] = commit_output


    command = 'cd ' + repo_path + ' && git log -n 1 --pretty=format:"%ad" ' + str(commit_hash)
    # print(command)
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    commit_output = str(process.communicate()[0])[2:-1]
    commit_metadata["author_date"] = commit_output

    command = 'cd ' + repo_path + ' && git log -n 1 --pretty=format:"%an" ' + str(commit_hash)
    # print(command)
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    commit_output = str(process.communicate()[0])[2:-1]
    commit_metadata["author_name"] = commit_output

    command = 'cd ' + repo_path + ' && git log -n 1 --pretty=format:"%s" ' + str(commit_hash)
    # print(command)
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    commit_output = str(process.communicate()[0])[2:-1]
    commit_metadata["subject"] = commit_output

    command = 'cd ' + repo_path + ' && git diff-tree --no-commit-id --name-only -r ' + str(commit_hash)
    # print(command)
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    commit_output = str(process.communicate()[0])[2:-1]
    commit_metadata["files_changed"] = commit_output.split("\\").pop()

    # print(commit_metadata)
    return(commit_metadata)
    # command = ('cd %s && git log -n 1 --pretty=format:"%\an" ' + tmp_commit" % (repo_url, output_path + "/" + team_name + "." + repo_name))
    # print(command)
    # response = subprocess.check_output(command.split())
    # var checkout_command = `cd ${repo_path} && git log -n 1 --pretty=format:"%an" ` + tmp_commit
    # commit_result.author_name  = await execSync(checkout_command).toString()
    # checkout_command = `cd ${repo_path} && git log -n 1 --pretty=format:"%ae" ` + tmp_commit
    # commit_result.author_email = await execSync(checkout_command).toString()
    # checkout_command = `cd ${repo_path} && git log -n 1 --pretty=format:"%ad" ` + tmp_commit
    # commit_result.author_date = await execSync(checkout_command).toString()
    # checkout_command = `cd ${repo_path} && git log -n 1 --pretty=format:"%s" ` + tmp_commit
    # commit_result.subject = await execSync(checkout_command).toString()
    # checkout_command = `cd ${repo_path} && git diff-tree --no-commit-id --name-only -r ` + tmp_commit
    # commit_result.files_changed = await execSync(checkout_command).toString().split("\n")
    # commit_result.num_files_changed = commit_result.files_changed.length - 1
    # commit_result.files_changed.pop()
    # return(commit_result)
def get_repo_metadata(git_path):
    team_name = git_path.split("/")[2].split(".")[0]
    repo_name = git_path.split("/")[2].split(".")[1]
    get_hashes_command = "cd %s && git log --pretty=oneline" % (git_path)
    #print(get_hashes_command)
    process = subprocess.Popen(get_hashes_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    commit_output = str(process.communicate()).split("\\n")
    commits = []
    for commit in commit_output:
        #print(commit)
        commits.append(commit.split(" ")[0])
    repo_metadata = []
    commits.pop()  
    commits.reverse()
    the_commits = []
    # get_commits(team_name, repo_name, git_path, str(commits[0])[0:-1]) #, str(commits[1])[3:-1] 
    print(len(commits))
    for commit in commits:
        the_commits.append(get_commit(team_name, repo_name, git_path, commit[0:-1]))
        print(len(the_commits))
    print("\n\nSAVING JSON\n\n")
    with open(output_path + "/" + team_name + "." + repo_name + "." +'.json', 'w') as f:
        json.dump(the_commits, f)
# for repo in list_of_git_repos:
#     get_repo_metadata(repo)
# get_repo_metadata("./git_repos/bitcoin.bips/")