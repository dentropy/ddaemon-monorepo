#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi


curl -XGET -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/_cluster/state?pretty"