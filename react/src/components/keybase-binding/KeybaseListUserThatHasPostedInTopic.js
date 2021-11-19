/*

* Get a list of all the channel's on the team
* Get a list of all channel's with a message from a user
* Compare the two lists
  * Put channel's someone has not posted in one new list
* Print the two lists

*/

import React, { useState, useEffect } from 'react';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { QueryBuilder } from '../helper-functions/QueryBuilder';
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
export const KeybaseListUserThatHasPostedInTopic =  (props) => {
    const [state, dispatch] = React.useContext(KeybaseContext);
    const [resultData, setResultData] = useState([{
      id:"Test",
      topic:"username"
    }]);
    const my_columns =  ['id', 'username']
    useEffect(() => {
      async function doAsync() {
        let team_name = state.team_selected
        if (!state.graph_metadata.team_list.includes(state.team_selected) && state.team_selected != "*") {
          team_name = "complexweekend.oct2020"
        }
        let myData = await QueryBuilder({
          "basic_aggs":"msg.sender.username",
          "team_selected":state.graph_metadata.team_selected,
          "team_list":state.graph_metadata.team_list,
          "topic_selected":state.graph_metadata.topic_selected
        });
        let rendered_data = [];
        let mah_data = [];
        console.log("KeybaseListUsersThatHasNotPostedInTopic myData")
        console.log(myData)
        let full_team_list = []
        let user_team_list = []
        state.graph_metadata.user_list.forEach((thingy) => {
          full_team_list.push(thingy.label)
        })
        myData.table.forEach((thingy) => {
          user_team_list.push(thingy.key)
        })
        // state.graph_metadata.team_list {list} .label
        // console.log("state.graph_metadata.team_list")
        // console.log(state.graph_metadata.team_list)
        // console.log("console.log(myData)")
        // console.log(myData)
        // console.log("myData.aggregations.departments.buckets") // {list} .key
        // console.log(myData.aggregations.departments.buckets)
        // console.log("user_team_list")
        // console.log(user_team_list)
        // console.log("full_team_list")
        // console.log(full_team_list)
        for (var i = 0; i < full_team_list.length; i++){
          console.log("full_team_list")
          if (full_team_list.indexOf(user_team_list[i]) != -1) {
            mah_data.push({
              id: mah_data.length,
              username: full_team_list[i]
            })
          }
        }
        setResultData(myData)
        // setGraph(
        //   <div style={{ height: 400, width: '100%' }}>
        //     <DataGrid
        //       rows={mah_data}
        //       columns={columns}
        //     />
        //   </div>
        // )
      }
      doAsync()
    }, [props]);

    return (
        <div>
          <Grid
            data={resultData}
            columns={my_columns}
            pagination={{
              limit: 10,
            }}
            sort={true}
            search={true}
          />
        </div>
    )
}