import json
import subprocess
git_repos =  json.load((open('gitrepos.json')))
print(git_repos)
output_path = "./git_repos"

for repo_url in git_repos:
    print(repo_url)
    if (len(repo_url.split("/")) >= 5):
        team_name = repo_url.split("/")[3]
        repo_name = repo_url.split("/")[4]
        command = ("git clone %s.git %s" % (repo_url, output_path + "/" + team_name + "." + repo_name))
        print(command)
        response = subprocess.check_output(command.split())
        print((response.decode('utf-8')))
