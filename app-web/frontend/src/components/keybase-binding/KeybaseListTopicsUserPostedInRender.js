/*

* Get a list of all the channel's on the team
* Get a list of all channel's with a message from a user
* Compare the two lists
  * Put channel's someone has not posted in one new list
* Print the two lists

*/

import React, { useState, useEffect } from 'react';
import { Context } from '../../Provider';
import { DataGrid } from '@mui/x-data-grid';
export const KeybaseListTopicsUserPostedInRender =  (props) => {
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
        console.log(body_query)
        console.log("console.log(myData)")
        console.log(myData)
        console.log('"hits" in myData')
        console.log("hits" in myData)
        let rendered_data = [];
        let mah_data = [];
        console.log(myData.aggregations.departments.buckets)
        const columns = [
          { field: 'id', headerName: 'ID', width: "100" },
          { field: 'username', headerName: 'username', width: "400" }
        ]
        myData.aggregations.departments.buckets.forEach((thingy) => {
            console.log(thingy.key)
            mah_data.push({
              id: mah_data.length,
              username: thingy.key
            })
            rendered_data.push(
                <>
                    <p>{thingy.key}</p>
                </>
            )
        })
        setGraph(
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={mah_data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
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