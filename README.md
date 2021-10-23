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
```

## Useful links

* [react-vega/packages/react-vega at master · vega/react-vega](https://github.com/vega/react-vega/tree/master/packages/react-vega)

## Building container

``` bash
bash build-react.sh
bash built-container.sh

# Test Container
docker-compose up --env-file ./backend/.env
# Go to http://localhost:8081 and verify app is working

```