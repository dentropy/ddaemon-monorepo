# Dentropy Daemon App

The goal of this code is to have a website for people to log into that provides analytics into keybase.

## Requirements

* Elasticsearch
  * [You can use my dentropycloud ELK deployment](https://gitlab.com/dentropy/dentropycloud-traefik/-/tree/master/apps/ELK)
* Nodejs with npm
* Keybase logging into a computer

## Setup

1. Get the [keybase-binding - npm package](https://www.npmjs.com/package/keybase-binding)
2. Export the keybase chats from a keybase team, in this case dentropydaemon
3. Setup elasticsearch (Message @dentropy on keybase for help)
4. Dumb chat logs to elasticsearch

``` bash
# 1.
npm install -g keybase-binding 
npm exec keybase-binding -- --help
# 2.
npm exec keybase-binding -- -tc dentropydaemon
# 4.
npm exec keybase-binding -- -tc dentropydaemon -en http://localhost:9200 -eu elastic -ep mysecurepassword -ei keybase-binding 

# or
ELASTIC_USER=elastic
ELASTIC_PASS=admin
ELASTIC_NODE=http://localhost:9200
npm exec keybase-binding -- -tc dentropydaemon -en $ELASTIC_NODE -eu $ELASTIC_USER -ep $ELASTIC_PASS -ei keybase-dentropydaemon 
npm exec keybase-binding -- -tc complexweekend.oct2020 -en $ELASTIC_NODE -eu $ELASTIC_USER -ep $ELASTIC_PASS -ei keybase-complexweekend.oct2020 
npm exec keybase-binding -- -tc complexweekend.may2021 -en $ELASTIC_NODE -eu $ELASTIC_USER -ep $ELASTIC_PASS -ei keybase-complexweekend.may2021
npm exec keybase-binding -- -tc complexweekend.nov2021 -en $ELASTIC_NODE -eu $ELASTIC_USER -ep $ELASTIC_PASS -ei keybase-complexweekend.nov2021 
npm exec keybase-binding -- -tc complexweekend.general -en $ELASTIC_NODE -eu $ELASTIC_USER -ep $ELASTIC_PASS -ei keybase-complexweekend.general
```

## Useful links

* [react-vega/packages/react-vega at master · vega/react-vega](https://github.com/vega/react-vega/tree/master/packages/react-vega)

## Building container Locally

``` bash
bash build-react.sh
cd backend
bash built-container.sh

# Test Container
docker-compose up --env-file ./backend/.env
# Go to http://localhost:8081 and verify app is working


# Production container
# Save password and hash somewhere
rsync -avzhe ssh --progress ./backend complexity@elasticsearch.complexityweekend.xyz:~
# SSH into server
# Install [Paul Mullins / DentropyCloud-traefik · GitLab](https://gitlab.com/dentropy/dentropycloud-traefik) on server
# Either remove password or change password for production container
# Below command can be run locally on on server
sudo apt-get update
sudo apt-get install -y apache2-utils
echo $(htpasswd -nbB complexity mysecurepassword) | sed -e s/\\$/\\$\\$/g


# change the myhashhere to the output of the above command
vim ~/backend/docker-compose-prod.yml

cd ~/backend && docker-compose -f docker-compose-prod.yml --env-file .env up -d
```

## fieldata query

```
PUT keybase-dentropydaemon/_mapping
{
  "properties": {
    "msg.channel.topic_name": { 
      "type":     "text",
      "fielddata": true
    },
    "msg.content.type": { 
      "type":     "text",
      "fielddata": true
    },
    "msg.sender.username": { 
      "type":     "text",
      "fielddata": true
    },
    "msg.content.reaction.b": { 
      "type":     "text",
      "fielddata": true
    },
    "msg.channel.name": { 
      "type":     "text",
      "fielddata": true
    }
  }
}
```