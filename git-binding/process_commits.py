import json
import pprint
from collections import Counter
from glob import glob
import sys
import os
# from urlextract import URLExtract
# extractor = URLExtract()


def parse_commit(tmp_commit, repoName):
    tmp_commit["repoName"] = repoName
    tmp_commit["authorName"]  = " ".join(tmp_commit['author'].split("<")[:-1])[:-1]
    tmp_commit["authorEmail"] = tmp_commit['author'].split("<")[-1][:-1]
    tmp_commit["authorNameCount"] = len(tmp_commit["authorEmail"].split(" "))
    tmp_commit["authorEmailDomain"] = tmp_commit["authorEmail"].split("@")[-1]
    tmp_commit["messageWordCount"] = 1 + Counter(tmp_commit["message"])[" "] + Counter(tmp_commit["message"])["-"]
    tmp_commit["messageCharacterCount"] = len(tmp_commit["message"])
    tmp_commit["messageCharacterVersesWord"] = tmp_commit["messageCharacterCount"] / tmp_commit["messageWordCount"]
    tmp_commit["urlCountInMessage"] = len(tmp_commit["message"].split("http")) 
        # len(extractor.find_urls(tmp_commit["message"]))
    tmp_commit["pathCount"] = 0
    tmp_commit["totalInsertions"] = 0
    tmp_commit["totalDeletions"] = 0
    for tmp_path in tmp_commit["paths"]:
        tmp_commit["pathCount"] += 1
        if(tmp_path["insertions"] != "-"):
            tmp_commit["totalInsertions"] += float(tmp_path["insertions"])
        if(tmp_path["deletions"] != "-"):
            tmp_commit["totalDeletions"] += float(tmp_path["deletions"])
    return(tmp_commit)

def parse_json_file(tmp_filename):
    try:
        tmp_commits = json.load(open(tmp_filename))
    except:
        print("Error parsing JSON for " + tmp_filename)
        return False
    for tmp_commit in tmp_commits:
        parse_commit(tmp_commit, "test")
    return(tmp_commits)


# part_json_file('json_exports/0x-launch-kit.json')

def parse_all_files():
    if(len(sys.argv) <= 1):
        print("Please input a path of the JSON files")
        sys.exit()
    if( not os.path.exists("./ndjson_exports" ) ):
        os.mkdir("./ndjson_exports")
    mah_files = glob(sys.argv[1] + "/*.json")
    for tmp_file in mah_files:
        parsed_commits = parse_json_file(tmp_file)
        if parse_json_file != False:
            elastic_index = "git-commits-" + tmp_file.split("/")[-1][:-5].lower()
            print("Parsed " + elastic_index)
            output_file = ""
            for commit in parsed_commits:
                index_line = {"index":{"_index":elastic_index,"_id":commit["id"],"_type":"_doc"}}
                output_file +=  json.dumps(index_line, separators=(',', ':')) + "\n"
                output_file +=  json.dumps(commit, separators=(',', ':')) + "\n"
                f = open("ndjson_exports/" + elastic_index + ".ndjson", "a")
                f.write(output_file)
                f.close()


parse_all_files()
