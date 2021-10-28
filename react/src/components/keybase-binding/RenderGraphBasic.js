import React, { useEffect } from 'react';
import { VegaLite } from 'react-vega'

export const RenderGraphBasic =  (props) => {
    useEffect(() => {
      async function doAsync() {
        let query_field = "msg.channel.topic_name.keyword" // "msg.content.type"
        let team_name = document.getElementById("combo-box-demo").value
        console.log("team_name")
        if (team_name == "") {
          team_name = "complexweekend.oct2020"
        }
        let myData = await (await fetch('/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            "index": "keybase-*",
            "query": {
              "query": {
                "bool": {
                  "must": [
                    {
                      "exists": {
                        "field": query_field
                      },
                    },
                    { "match": {
                      "msg.channel.name": {"query": team_name}
                      }
                    }
                  ]
                }
              },
              "aggs": {
                "keys": {
                  "terms": {
                    "field": query_field,
                    "size": 100
                  }
                }
              }
  
            }
          })
        })).json()
        let formatted_data = {'table':[]}
        console.log(myData.aggregations.keys.buckets)
        myData.aggregations.keys.buckets.forEach((thingy) => {
          formatted_data.table.push(thingy)
        })
        console.log(formatted_data)
        setData(formatted_data);
      }
      doAsync()
      }, []);

    const spec = {
    width: 400,
    height: 200,
    mark: 'bar',
    encoding: {
        // key, doc_count
        x: { field: 'key', type: 'ordinal', "sort":"y"},
        y: { field: 'doc_count', type: 'quantitative'},
    },
    data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
    }
    
    const barData = {
    table: [
        { key: 'A', doc_count: 28 },
        { key: 'B', doc_count: 55 },
        { key: 'C', doc_count: 43 },
        { key: 'D', doc_count: 91 },
        { key: 'E', doc_count: 81 },
        { key: 'F', doc_count: 53 },
        { key: 'G', doc_count: 19 },
        { key: 'H', doc_count: 87 },
        { key: 'I', doc_count: 52 },
    ],
    }

    return (
        <div>
            <VegaLite spec={spec} data={data} view='svg'/>
            {props.hello}
        </div>
    )
}