mkdir cloned-repos
cd cloned-repos
GIT_REPOS=`jq -r ".[]" ../gitrepos.json`
echo $GIT_REPOS
for REPO in $GIT_REPOS
do
    echo $REPO
    git clone $REPO
done