#!/bin/bash


if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi


# echo $ELASTIC_USER
# echo $ELASTIC_PASS
# echo $ELASTIC_NODE

curl -v -s -XPUT -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/discordguilds/_doc/_bulk?pretty" -H 'Content-Type:application/x-ndjson' --data-binary @exports/guilds.ndjson
for folder in exports/*; 
do 
    curl -v -s -XPUT -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/discordusers/_doc/_bulk?pretty" -H 'Content-Type:application/x-ndjson' --data-binary @$folder/users/users.ndjson
    curl -v -s -XPUT -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/discordchannels/_doc/_bulk?pretty" -H 'Content-Type:application/x-ndjson' --data-binary @$folder/channels/channels.ndjson
    for file in $folder/messages/*.ndjson; 
    do 
        echo $file; 
        # curl -v -s -XPUT -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/discordmessages/_doc/_bulk?pretty" -H 'Content-Type:application/x-ndjson' --data-binary @$file
        # sleep 3
    done
done
