## Example Elasticsearch Queries


-----

**Compare types of messages**
``` eql
GET /dentropydaemon-keybase/_search
{
  "query": {
    "bool": {
        "must": [{
            "exists": {
                "field": "msg.content.type"
            }
        }]
      }
    },
  "aggs": {
    "keys": {
      "terms": {
        "field": "msg.content.type"
      }
    }
  },
  "size": 0
} 
```

-----
