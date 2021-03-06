import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
import { KeybaseRenderGraphBar } from './KeybaseRenderGraphBar';
import { Context } from '../Provider';
export const UserMessagesAcrossTeam =  (props) => {
    const [state, dispatch] = React.useContext(Context);
    const [graph, setGraph] = useState(<h1>Leading Graph</h1>)
    console.log("SETTING GRAPH")
    useEffect(() => {
      async function doAsync() {
        console.log("useEffect")
        let team_name = state.graph_metadata.team_selected
        if (!state.graph_metadata.team_list.includes(state.graph_metadata.team_selected) && state.graph_metadata.team_selected != "*") {
          team_name = "complexweekend.oct2020"
        }
        console.log("team_name")
        console.log(team_name)
        // TODO set oct2020 value for the forum
        // "msg.channel.topic_name.keyword" // "msg.content.type" // msg.sender.username
        let body_query = ({
          "index": "keybase-*",
            "query": {
                "bool": {
                    "must": [
                          {
                            "match": {
                              "msg.channel.name": {
                                "query": state.graph_metadata.team_selected
                              }
                            }
                          },
                          {
                            "match": {
                              "msg.content.type": {
                                "query": "text"
                              }
                            }
                          },
                          ,
                            {
                                "match": {
                                "msg.sender.username": {
                                    "query": state.graph_metadata.user_selected
                                }
                                }
                            }
                    ]
                }
            },
            "aggs": {
                "departments": {
                    "terms": {
                        "field": "msg.channel.topic_name"
                    }
                }
            },
          "size": 0
        })
        if (state.graph_metadata.team_selected == "*") {
          console.log("console.log(body_query.query)")
          console.log(body_query)
          console.log(body_query.query.query.bool.must.pop())
        }
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
        console.log('"hits" in myData')
        console.log("hits" in myData)
        if("hits" in myData) {
          let formatted_data = {'table':[]}
          console.log("myData.aggregations.keys.buckets")
          console.log(myData.aggregations.keys.buckets)
          myData.aggregations.keys.buckets.forEach((thingy) => {
            formatted_data.table.push(thingy)
          })
          console.log(formatted_data)
          //dispatch({ type: "GRAPH_METADATA", payload: formatted_data})
          console.log("Render intermediate graph")
          setGraph(
            <KeybaseRenderGraphBar 
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