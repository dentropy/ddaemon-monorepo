#!/bin/bash


if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi


# echo $ELASTIC_USER
# echo $ELASTIC_PASS
# echo $ELASTIC_NODE

for folder in exports/*; 
do 
    for file in $folder/messages/*.ndjson; 
    do 
        echo $file; 
        curl -v -s -XPUT -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/discord-test/_doc/_bulk?pretty" -H 'Content-Type:application/x-ndjson' --data-binary @$file
        # sleep 5
    done
    curl -v -s -XPUT -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/discordusers/_doc/_bulk?pretty" -H 'Content-Type:application/x-ndjson' --data-binary @$folder/users/users.ndjson
done
