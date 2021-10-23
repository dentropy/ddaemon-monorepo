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
npm exec keybase-binding -- -tc complexweekend.general -en $ELASTIC_NODE -eu $ELASTIC_USER -ep $ELASTIC_PASS -ei keybase-complexweekend.general
npm exec keybase-binding -- -tc complexweekend.nov2021 -en $ELASTIC_NODE -eu $ELASTIC_USER -ep $ELASTIC_PASS -ei keybase-complexweekend.nov2021
```

## Useful links

* [react-vega/packages/react-vega at master · vega/react-vega](https://github.com/vega/react-vega/tree/master/packages/react-vega)

## Building container Locally

``` bash
bash build-react.sh
bash built-container.sh

# Test Container
docker-compose up --env-file ./backend/.env
# Go to http://localhost:8081 and verify app is working

```

## Building container for production

``` bash
# Either remove password or change password for production container
sudo apt-get install apache2-utils
echo $(htpasswd -nbB complexity mysecurepassword) | sed -e s/\\$/\\$\\$/g
```