#!/bin/bash

curl -XPOST -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/test/_doc/1" -d @lane.json