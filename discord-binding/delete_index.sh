#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi


curl -XDELETE -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/discord*"