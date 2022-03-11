#!/bin/bash


save_folder_name="gitauthor-out"

if [ ! -d ./$save_folder_name ]; then
  mkdir -p ./$save_folder_name;
fi

root_path=`pwd`
exports="$root_path/$save_folder_name"

for d in $1/* ; do
    IFS="/" read -a myarray <<< $d
    repo_name=${myarray[-1]}
    cd $d
    echo `pwd`
    git shortlog --summary --numbered --email >> $exports/$repo_name.out
    echo "Saved $exports/$repo_name.out"
    cd $root_path
done
