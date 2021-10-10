import { Client } from '@elastic/elasticsearch'
import express from 'express';
var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


let elastic_node = "https://elasticsearch.complexityweekend.xyz"
let elastic_user = "elastic"
let elastic_pass = "IdZYY9QeF0H2kjJC8eXbluBaYh6ZJdM"
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

async function main() {
    let response = await client.indices.putMapping({
        index: 'dentropydaemon-keybase',
        body: {
            properties: { 
                "msg.content.type": { 
                    "type":     "text",
                    "fielddata": true
                }
            }
        }
    })
    console.log(response)
}
main()

// PUT my-index-000001/_mapping
// {
//   "properties": {
//     "msg.content.type": { 
//       "type":     "text",
//       "fielddata": true
//     }
//   }
// }