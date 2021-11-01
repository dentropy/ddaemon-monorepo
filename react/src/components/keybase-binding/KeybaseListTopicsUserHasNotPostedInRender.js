/*

* Get a list of all the channel's on the team
* Get a list of all channel's with a message from a user
* Compare the two lists
  * Put channel's someone has not posted in one new list
* Print the two lists

*/

import React, { useState, useEffect } from 'react';
import { Context } from '../../Provider';
import DataGrid from 'react-data-grid';
export const KeybaseListTopicsUserHasNotPostedInRender =  (props) => {
    const [state, dispatch] = React.useContext(Context);
    const [graph, setGraph] = useState(<h1>Loading</h1>); // TODO
    useEffect(() => {
      async function doAsync() {
        console.log("useEffect")
        let team_name = state.team_selected
        if (!state.graph_metadata.team_list.includes(state.team_selected) && state.team_selected != "*") {
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

        // Compare the two lists
        // state.graph_metadata.team_list {list} .label
        console.log("state.graph_metadata.team_list")
        console.log(state.graph_metadata.team_list)
        console.log("console.log(myData)")
        console.log(myData)
        console.log("myData.aggregations.departments.buckets") // {list} .key
        console.log(myData.aggregations.departments.buckets)
        let rendered_data = [];
        let mah_data = [];
        const columns = [
          { key: 'id', name: 'ID' },
          { key: 'username', name: 'username'}
        ]
        let full_team_list = []
        let user_team_list = []
        state.graph_metadata.topic_list.forEach((thingy) => {
          full_team_list.push(thingy.label)
        })
        myData.aggregations.departments.buckets.forEach((thingy) => {
          user_team_list.push(thingy.key)
        })
        console.log("user_team_list")
        console.log(user_team_list)
        console.log("full_team_list")
        console.log(full_team_list)
        for (var i = 0; i < full_team_list.length; i++){
          console.log("full_team_list")
          if (full_team_list.indexOf(user_team_list[i]) != -1) {
            mah_data.push({
              id: mah_data.length,
              username: full_team_list[i]
            })
            rendered_data.push(
                <>
                    <p>{full_team_list[i]}</p>
                </>
            )
          }
        }
        

        // myData.aggregations.departments.buckets.forEach((thingy) => {
        //     //console.log(thingy.key)
        //     mah_data.push({
        //       id: mah_data.length,
        //       username: thingy.key
        //     })
        //     rendered_data.push(
        //         <>
        //             <p>{thingy.key}</p>
        //         </>
        //     )
        // })
        setGraph(
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={mah_data}
              columns={columns}
            />
          </div>
        )
        //setGraph(rendered_data)
      }
      doAsync()
    }, [props]);

    return (
        <div>
          {graph}
        </div>
    )
}