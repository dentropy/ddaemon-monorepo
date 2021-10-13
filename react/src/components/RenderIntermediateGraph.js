import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
import { Context } from './Context';

export const RenderIntermediateGraph =  (props) => {
    const [data, setData] = useState({
        table: [
          { a: 'A', b: 28, key:'loading', doc_count: 420 }
        ],
    });
    const [graph, setGraph] = useState(<h1>Loading</h1>); // TODO


    const spec = {
      width: 400,
      height: 200,
      mark: 'bar',
      encoding: {
          // key, doc_count
          x: { "title": "keybase username",   field: 'key', type: 'ordinal', "sort":"y"},
          y: { "title": "Number of messages", field: 'doc_count', type: 'quantitative'},
      },
      data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
      "title": {
        "text": `Number of ${props.most} per user`,
        "subtitle": "Across entire dentropydaemon team",
        "encode": {
          "title": {
            "enter": {
              "fill": {"value": "purple"}
            }
          },
          "subtitle": {
            "interactive": true,
            "update": {
              "fontStyle": {"value": "italic"}
            },
            "hover": {
              "fontStyle": {"value": "normal"}
            }
          }
        }
      }
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


    useEffect(() => {
      async function doAsync() {
        //let query_field = "msg.channel.topic_name.keyword" // "msg.content.type"
        console.log("useEffect")
        //console.log(props.query_field)
        console.log(props)
        let body_query = JSON.stringify({
          "index": "keybase-dentropydaemon",
          "query": {
            "query": {
              "bool": {
                "must": [{
                  "exists": {
                    "field": props.per
                    },
                  },{ "match": {
                    'msg.content.type' : {"query": props.most}
                    }
                }
              ]
              }
            },
            "aggs": {
              "keys": {
                "terms": {
                  "field": props.per
                }
              }
            },
            "size": 0
          }
        })
        let myData = await (await fetch('/query', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: body_query
        })).json()
        console.log(body_query)
        let formatted_data = {'table':[]}
        console.log(myData.aggregations.keys.buckets)
        myData.aggregations.keys.buckets.forEach((thingy) => {
          formatted_data.table.push(thingy)
        })
        console.log(formatted_data)
        setData(formatted_data);
        setGraph(<VegaLite spec={spec} data={formatted_data} view='svg'/>)
      }
      doAsync()
    }, []);

    return (
        <div>
            {graph}
        </div>
    )
}