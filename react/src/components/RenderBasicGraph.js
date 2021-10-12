import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'

export const RenderBasicGraph =  () => {
    const [data, setData] = useState({
        table: [
          { a: 'A', b: 28, key:'loading', doc_count: 420 }
        ],
      });
      const [graph, setGraph] = useState(<h1>Loading</h1>); // TODO
      useEffect(() => {
        async function doAsync() {
          let query_field = "msg.channel.topic_name.keyword" // "msg.content.type"
          let myData = await (await fetch('/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              "index": "keybase-dentropydaemon",
              "query": {
                "query": {
                  "bool": {
                    "must": [{
                      "exists": {
                        "field": query_field
                      }
                    }]
                  }
                },
                "aggs": {
                  "keys": {
                    "terms": {
                      "field": query_field
                    }
                  }
                },
                "size": 0
    
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
        </div>
    )
}