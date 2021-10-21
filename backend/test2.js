let mah_data = {
  "index": "keybase-dentropydaemon",
  "query": {
    "query": {
        "bool": {
            "must": [
                {
                    "exists": {
                        "field": "msg.content.type"
                    }
                },
                { "match": {
                    "msg.channel.topic_name": {"query": "general"}
                    }
                }
            ]
        }
    },
    "aggs": {
        "departments": {
            "terms": {
                "field": "msg.content.type"
            }
        }
    }
  }
}
import axios from 'axios';
// Send a POST request

async function main(){
    let test_query = await axios({
      method: 'post',
      url: 'http://localhost:8081/query',
      data: mah_data
    })
    console.log(test_query)
    console.log(test_query.data)
}
main()