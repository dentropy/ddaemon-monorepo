# ddaemon discord binding

## Requirements

* [Tyrrrz/DiscordChatExporter: Exports Discord chat logs to a file](https://github.com/Tyrrrz/DiscordChatExporter)
* curl
* nodejs
* Elasticsearch

## TODO

* Get the character count of the contents
* Get the number of attachments, mentions, embeds etc
* Parse out any domain names

## Delete Specific Index

``` bash
source .env
curl -XDELETE -iL -u $ELASTIC_USER:$ELASTIC_PASS "$ELASTIC_NODE/discordguild*"
```
