import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
import { Context } from '../Provider';
export const BarGraphRender =  (props) => {
    const [data, setData] = useState({
        table: [
          { a: 'A', b: 28, key:'loading', doc_count: 420 }
        ],
    });
    const [state, dispatch] = React.useContext(Context);
    console.log("state.metadata")
    console.log(props.meta_data)
    const [graph, setGraph] = useState(<h1>Loading</h1>); // TODO
    // console.log("mah_context")
    // console.log(props.mah_context)

    const spec = {
      width: props.graph_width,
      height: props.graph_height,
      mark: 'bar',
      encoding: {
          // key, doc_count
          x: { "title": "keybase username",   field: 'key', type: 'ordinal', "sort":"y"},
          y: { "title": "Number of messages", field: 'doc_count', type: 'quantitative'},
      },
      data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
      "title": {
        "text": `Number of ${props.most}'s' per user`,
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
        console.log("useEffect")
        let team_name = props.team_selected
        if (team_name == "") {
          team_name = "complexweekend.oct2020"
        }
        // TODO set oct2020 value for the forum
        let body_query = JSON.stringify({
          "index": "keybase-*",
          "query": {
            "query": {
              "bool": {
                "must": [
                  {
                    "exists": {
                      "field": props.per
                    },
                  },
                  { 
                    "match": {
                      'msg.content.type' : {"query": props.most}
                    }  
                  },
                  { 
                    "match": {
                      "msg.channel.name": {"query": team_name}
                    }
                  }
                ]
              }
            },
            "aggs": {
              "keys": {
                "terms": {
                  "field": props.per,
                  "size": 100
                }
              }
            }
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
        console.log(myData)
        let formatted_data = {'table':[]}
        console.log(myData.aggregations.keys.buckets)
        myData.aggregations.keys.buckets.forEach((thingy) => {
          formatted_data.table.push(thingy)
        })
        console.log(formatted_data)
        setData(formatted_data);
        setGraph(<VegaLite spec={spec} data={props.meta_data} view='svg'/>)
        console.log("Render intermediate graph")
        console.log("JSON.stringify(props)")
        console.log(JSON.stringify(props))
      }
      doAsync()
    }, [props]);

    return (
        <div>
            {graph}
        </div>
    )
}