#!/bin/bash

echo "MUST BE RUN FROM ROOT FOLDER FOR ELASTIC TO WORK"

if [ -f .env ]
then
  export $(cat ./.env | sed 's/#.*//g' | xargs)
fi


echo $ELASTIC_USER
echo $ELASTIC_PASS
echo $ELASTIC_NODE

for file in git-binding/ndjson_exports/*; 
do
    file_path=$file
    IFS='/'
    read -rasplitIFS<<< $file
    ndjson_file_name=${splitIFS[-1]}
    IFS='.'
    read -rasplitIFS<<< $ndjson_file_name
    index_name=${splitIFS[0]}
    IFS=''
    echo "curl -v -s -XPUT -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/$index_name/_doc/_bulk?pretty" -H 'Content-Type: application/x-ndjson' --data-binary @$file"
    curl -v -s -XPUT -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/$index_name/_doc/_bulk?pretty" -H 'Content-Type: application/x-ndjson' --data-binary @$file_path
    # sleep 2
done
