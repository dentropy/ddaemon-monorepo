let mah_data = {
  "index": "keybase-dentropydaemon",
  "query": {
    "query": {
        "bool": {
            "must": [
                { "match": {
                    "msg.content.type": {"query": "text"}
                    }
                }
            ]
        }
    },
    "aggs": {
        "departments": {
            "terms": {
                "field": "msg.sender.username",
                "size":100
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
    console.log(test_query.data.aggregations.departments.buckets)

}
main()