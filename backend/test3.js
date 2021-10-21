import { Client } from '@elastic/elasticsearch'
import express from 'express';
var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


let elastic_node = "https://elasticsearch.complexityweekend.xyz"
let elastic_user = "elastic"
let elastic_pass = "DHeUzn6ZLNXqCAYqYH376XqivOV5hdc"
const client = new Client({ 
    node: elastic_node,
    auth: {
        username: elastic_user,
        password: elastic_pass
    },
    ssl: {
        rejectUnauthorized: false
    }
})


/*
client.indices.putMapping({
  index: string | string[],
  type: string,
  include_type_name: boolean,
  timeout: string,
  master_timeout: string,
  ignore_unavailable: boolean,
  allow_no_indices: boolean,
  expand_wildcards: 'open' | 'closed' | 'hidden' | 'none' | 'all',
  write_index_only: boolean,
  body: object
})
*/
async function main() {
    let response = await client.indices.putMapping({
      index: "keybase-complexweekend.oct2020",
      body: {
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
    })
    console.log(response.body)
}
main()