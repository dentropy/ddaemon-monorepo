# Keybase Binding Nodejs

The nodejs keybase binding is simple. Export everything to the file system via JSON and include a script to dump data to elasticsearch.

## Requirements

* nodejs with npm
  * For Mac and Linux users you can use [Node Version Manager](https://github.com/nvm-sh/nvm)
* keybase installed and logged in on your computer

## Example commands

**Help Command**
`npm exec  keybase-binding -- --help`

**Export a list of teams you are logged into**
`npm exec  keybase-binding -- -t`

**Export a team chats**
`npm exec  keybase-binding -- -tc dentropydaemon`

**Export a team chats WITH attachments**
`npm exec  keybase-binding -- -tc dentropydaemon -a`

**Change export path**
`npm exec  keybase-binding -- -t -p ~/Downloads/keybase-exports`

**Export to elasticsearch**

``` bash
# -en Elastic node URL
# -eu Elastic user
# -ep Elastic password
# -ei Elastic index
npm exec  keybase-binding -- -tc dentropydaemon \
  -en http://localhost:9200 -eu elastic -ep yourpass -ei keybase-dentropydaemon

curl -XGET  -iL -u $ELASTIC_USER:$ELASTIC_PASS $ELASTIC_NODE/keybase-*/_settings --insecure my_index/_settings
{
  "index.mapping.total_fields.limit": 2000
}
```
## Development setup

* Join the `@dentropydaemon` team on keybase
* Clone this repo `git clone keybase://team/dentropydaemon/keybase-binding-nodejs`
* `cd keybase-binding-nodejs && npm install`

## Features to be added (Ordered by priority)

* Elasticsearch dump option
* Export multiple teams with single command
* Export every team or group chat
  * blacklist
* Group chat list and export
* Clone all git repos
* Export team and user drive

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
