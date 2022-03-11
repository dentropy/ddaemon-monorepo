#!/bin/bash


if [ ! -d ./gitstat-out ]; then
  mkdir -p ./gitstat-out;
fi

root_path=`pwd`
exports="$root_path/gitstat-out"

for d in $1/* ; do
    IFS="/" read -a myarray <<< $d
    repo_name=${myarray[-1]}
    cd $d
    echo `pwd`
    gitstat . -o $repo_name.json > 
    echo "cp $repo_name.json $exports/$repo_name.json"
done


# myvar="I,Like,Pie"
# IFS="," read -a myarray <<< $myvar
# echo "My array: ${myarray[@]}"

# cd cloned-repos/0x-launch-kit/
# git_to_json

# https://gist.github.com/sergey-shpak/40fe8d2534c5e5941b9db9e28132ca0b
