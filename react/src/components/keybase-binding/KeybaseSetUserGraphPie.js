import React, { useState, useEffect } from 'react';
import { Context } from '../../Provider';
import { GraphPie } from '../graphs/GraphPie';
import { CheckElasticResponse } from '../helper-functions/CheckElasticResponse';
export const KeybaseSetUserGraphPie =  (props) => {
    const [state, dispatch] = React.useContext(Context);
    const [graph, setGraph] = useState(<h1>Loading Graph</h1>)
    console.log("SETTING GRAPH")
    useEffect(() => {
      async function doAsync() {
        // console.log("useEffect")
        // let team_name = state.graph_metadata.team_selected
        // if (!state.graph_metadata.team_list.includes(state.graph_metadata.team_selected) && state.graph_metadata.team_selected != "*") {
        //   team_name = "complexweekend.oct2020"
        // }
        let body_query = ({
          "index": "keybase-*",
          "query": {
            "query": {
              "bool": {
                "must": [
                  { 
                    "match": {
                      'msg.content.type' : {"query": "text"}
                    }  
                  },
                  { 
                    "match": {
                      "msg.sender.username": {"query": state.graph_metadata.user_selected}
                    }
                  }
                ]
              }
            },
            "aggs": {
              "keys": {
                "terms": {
                  "field": "msg.channel.topic_name.keyword",
                  "size": 100
                }
              }
            }
          }
        })
        // if (state.graph_metadata.team_selected == "*") {
        //   console.log(body_query.query.query.bool.must.pop())
        // }
        let myData = await (await fetch('/query', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(body_query)
        })).json()
        console.log(body_query)
        console.log("console.log(myData)")
        console.log(myData)
        // console.log('"hits" in myData')
        // console.log("hits" in myData)
        if(CheckElasticResponse(myData)) {
          let formatted_data = {'table':[]}
          // console.log("myData.aggregations.keys.buckets")
          // console.log(myData.aggregations.keys.buckets)
          myData.aggregations.keys.buckets.forEach((thingy) => {
            formatted_data.table.push(thingy)
          })
          console.log("formatted_data")
          console.log(formatted_data)
          //dispatch({ type: "GRAPH_METADATA", payload: formatted_data})
          console.log("Render intermediate graph")
          setGraph(
            <GraphPie 
              graph_width={props.graph_width} 
              graph_height={props.graph_height}
              most={props.most}
              per={props.per}
              team_selected={props.team_selected}
              meta_data={formatted_data}
              x_title="keybase username"
              y_title="Number of messages"
              title={ `Number of ${props.most}'s' per user`}
              subtitle={ `Across entire ${props.team_selected} team`}
              x_field="key"
              y_field="doc_count"
            />
          )
        } else {
          setGraph(<h1>Error fetching data</h1>)
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