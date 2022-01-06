#!/bin/bash

echo "MUST BE RUN FROM ROOT FOLDER FOR ELASTIC TO WORK"

if [ -f .env ]
then
  export $(cat ./.env | sed 's/#.*//g' | xargs)
fi


echo $ELASTIC_USER
echo $ELASTIC_PASS
echo $ELASTIC_NODE

curl -v -s -XDELETE -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/git-commits*"