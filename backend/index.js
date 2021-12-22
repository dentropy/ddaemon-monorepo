import { Client } from '@elastic/elasticsearch'
import express from 'express';
import dotenv from 'dotenv';
let mah_config = dotenv.config()

var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.static("static"));

// let elastic_node = "https://elasticsearch.complexityweekend.xyz"
// let elastic_user = "elastic"
// let elastic_pass = "DHeUzn6ZLNXqCAYqYH376XqivOV5hdc"

let elastic_node = process.env.ELASTIC_NODE
let elastic_user = process.env.ELASTIC_USER
let elastic_pass = process.env.ELASTIC_PASS

console.log(elastic_pass)
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

// This responds with "Hello World" on the homepage
// app.get('/', function (req, res) {
//   console.log("Got a GET request for the homepage");
//   res.send('Hello GET');
// })

// app.get("/", (req, res) => {
//     res.sendFile(path.join("./static", "public", "index.html"));
//   });

app.post('/query', async function (req, res) {
    console.log(req.body)
    console.log(req.body.index)
    console.log(req.body.query)
    let count = 100;
    if (req.body.count != undefined){
        count = req.body.count
    }
    try {
        const { body } = await client.search({
            index: req.body.index,//'dentropydaemon-keybase',
            // type: '_doc', // uncomment this line if you are using {es} ≤ 6
            body: req.body.query,
            size: 100
            // {
            //   "track_total_hits": true
            // }
        })
        //console.log(body.hits.hits)
        console.log(body)
        res.send(body)
    } catch (err){
      res.send(err)
    }
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
 
