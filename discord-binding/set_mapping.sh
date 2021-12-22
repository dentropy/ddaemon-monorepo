#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

curl --header "Content-Type: application/json" \
  -u $ELASTIC_USER:$ELASTIC_PASS \
  --request PUT \
--data '
{
  "properties": {
    "message_id": { 
      "type":     "text",
      "fielddata": true
    },
    "content": { 
      "type":     "text",
      "fielddata": true
    },
    "author.id": { 
      "type":     "text",
      "fielddata": true
    },
    "author.name": { 
      "type":     "text",
      "fielddata": true
    },
    "author.nickname": { 
      "type":     "text",
      "fielddata": true
    },
    "channel_id": { 
      "type":     "text",
      "fielddata": true
    },
    "guild_id": { 
      "type":     "text",
      "fielddata": true
    }
  }
} ' "$ELASTIC_NODE/discord-*/_mapping"