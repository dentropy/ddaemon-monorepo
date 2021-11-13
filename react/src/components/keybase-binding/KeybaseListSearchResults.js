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
import { CheckElasticResponse } from '../helper-functions/CheckElasticResponse';
export const KeybaseListSearchResults =  (props) => {
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
              "match": {
                  "msg.content.text.body": state.graph_metadata.general_search_phrase
              }
          },
          "size": 10
        }
        })
        // console.log(body_query)
        // TODO TEAM QUERY MANAGEMENT
        let myData = await (await fetch('/query', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(body_query)
        })).json()
            // console.log(body_query)
            console.log("console.log(myData)")
            console.log(myData)
            // console.log('"hits" in myData')
            // console.log("hits" in myData)
            let rendered_data = [];
            let mah_data = [];
            console.log(myData)
            if (myData.hits.hits.length == 0) {
              setGraph(<h1>Zero Results</h1>)
            }
            else {
              const columns = [
                { key: 'id', name: 'ID' },
                { key: 'username', name: 'username'},
                { key: 'topic', name: 'topic'},
                { key: 'team', name: 'team'},
                { key: 'body', name: 'body'}
              ]
              myData.hits.hits.forEach((message) => {
                console.log(message._source.msg)
                mah_data.push({
                  id: mah_data.length,
                  username: message._source.msg.sender.username,
                  topic: message._source.msg.channel.topic_name,
                  team: message._source.msg.channel.name,
                  body: message._source.msg.content.text.body
                })
              })
              setGraph(
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={mah_data}
                    columns={columns}
                  />
                </div>
              ) 

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