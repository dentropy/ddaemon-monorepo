/*

* Get a list of all the channel's on the team
* Get a list of all channel's with a message from a user
* Compare the two lists
  * Put channel's someone has not posted in one new list
* Print the two lists

*/

import React, { useState, useEffect } from 'react';
import { BarGraphRender } from './BarGraphRender';
import { Context } from '../Provider';
export const CheckWhoPostedRender =  (props) => {
    const [state, dispatch] = React.useContext(Context);
    const [graph, setGraph] = useState(<h1>Loading</h1>); // TODO
    useEffect(() => {
      async function doAsync() {
        console.log("useEffect")
        let team_name = state.team_selected
        if (!state.team_list.includes(state.team_selected) && state.team_selected != "*") {
          team_name = "complexweekend.oct2020"
        }
        console.log("team_name")
        console.log(team_name)
        let body_query = ({
          "index": "keybase-*",
          "query": {
            "query": {
              "bool": {
                "must": [
                  {
                    "match": {
                      "msg.channel.name": {
                        "query": state.team_selected
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
                  {
                    "match": {
                      "msg.sender.username": {
                        "query": state.keybase_user_select
                      }
                    }
                  }
                ]
              }
            },
            "aggs": {
              "departments": {
                "terms": {
                  "field": "msg.channel.topic_name",
                  "size": 100,
                  "order": {
                    "_key": "asc"
                  }
                }
              }
            },
            "size": 0
        }
        })
        // TODO TEAM QUERY MANAGEMENT
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
        let rendered_data = [];
        console.log(myData.aggregations.departments.buckets)
        myData.aggregations.departments.buckets.forEach((thingy) => {
            console.log(thingy.key)
            rendered_data.push(
                <>
                    <p>{thingy.key}</p>
                </>
            )
        })
        setGraph(rendered_data)
      }
      doAsync()
    }, [props]);

    return (
        <div>
          {graph}
        </div>
    )
}