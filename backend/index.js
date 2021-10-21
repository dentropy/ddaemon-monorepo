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

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello GET');
})

app.post('/query', async function (req, res) {
    console.log(req.body)
    console.log(req.body.index)
    console.log(req.body.query)
    try {
        const { body } = await client.search({
            index: req.body.index,//'dentropydaemon-keybase',
            // type: '_doc', // uncomment this line if you are using {es} ≤ 6
            body: req.body.query
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
 
