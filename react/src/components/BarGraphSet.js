import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
import { BarGraphRender } from './BarGraphRender';
import { Context } from '../Provider';
export const BarGraphSet =  (props) => {
    const [state, dispatch] = React.useContext(Context);
    const [graph, setGraph] = useState(<h1>Leading Graph</h1>)
    console.log("SETTING GRAPH")
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
        console.log("console.log(myData)")
        console.log(myData)
        if(myData.name == "ResponseError") {
          setGraph(<h1>Error fetching data</h1>)
        }
        else {
          let formatted_data = {'table':[]}
          console.log("myData.aggregations.keys.buckets")
          console.log(myData.aggregations.keys.buckets)
          myData.aggregations.keys.buckets.forEach((thingy) => {
            formatted_data.table.push(thingy)
          })
          console.log(formatted_data)
          dispatch({ type: "GRAPH_METADATA", payload: formatted_data})
          console.log("Render intermediate graph")
          setGraph(
            <BarGraphRender 
              graph_width={props.graph_width} 
              graph_height={props.graph_height}
              most={props.most}
              per={props.per}
              team_selected={props.team_selected}
              meta_data={formatted_data}
            />
          )
          console.log("JSON.stringify(props)")
          console.log(JSON.stringify(props))
        }
      }
      doAsync()
    }, [props]);

    return (
        <div>
          {graph}
        </div>
    )
}