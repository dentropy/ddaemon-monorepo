#!/bin/bash


while getopts u:a:f: flag
do
    case "${flag}" in
        P) repo_path=${OPTARG};;
        a) age=${OPTARG};;
        f) fullname=${OPTARG};;
    esac
done

if [ ! -d ./json_exports ]; then
  mkdir -p ./json_exports;
fi

git_to_json () {
    echo "RUNNING"
    git log \
        --pretty=format:'{%n  "id": "%H", "commit": "%H",%n  "author": "%aN <%aE>",%n  "date": "%ad",%n  "message": "%f"%n},' \
        $@ | \
        perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
        perl -pe 's/},]/}]/' > tmp-git-log.json

    git log \
        --numstat \
        --format='%H' \
        $@ | \
        perl -lawne '
            if (defined $F[1]) {
                print qq#{"insertions": "$F[0]", "deletions": "$F[1]", "path": "$F[2]"},#
            } elsif (defined $F[0]) {
                print qq#],\n"$F[0]": [#
            };
            END{print qq#],#}' | \
        tail -n +2 | \
        perl -wpe 'BEGIN{print "{"}; END{print "}"}' | \
        tr '\n' ' ' | \
        perl -wpe 's#(]|}),\s*(]|})#$1$2#g' | \
        perl -wpe 's#,\s*?}$#}#' > tmp-git-stat.json

    jq --slurp '.[1] as $logstat | .[0] | map(.paths = $logstat[.commit])' tmp-git-log.json tmp-git-stat.json > git-log.json

    rm tmp-git-log.json
    rm tmp-git-stat.json
}

root_path=`pwd`
exports="$root_path/json_exports"

for d in $1/* ; do
    IFS="/" read -a myarray <<< $d
    repo_name=${myarray[-1]}
    cd $d
    echo `pwd`
    git_to_json
    echo "cp ./git-log.json $exports/$repo_name.json"
    cp git-log.json $exports/$repo_name.json
    echo $repo_name
    cd $root_path
done


# myvar="I,Like,Pie"
# IFS="," read -a myarray <<< $myvar
# echo "My array: ${myarray[@]}"

# cd cloned-repos/0x-launch-kit/
# git_to_json

# https://gist.github.com/sergey-shpak/40fe8d2534c5e5941b9db9e28132ca0b
