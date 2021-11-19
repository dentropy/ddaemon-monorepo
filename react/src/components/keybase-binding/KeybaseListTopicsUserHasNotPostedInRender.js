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
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { KeybaseReducer  } from './KeybaseReducer'
import { QueryBuilder } from '../helper-functions/QueryBuilder';
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

export const KeybaseListTopicsUserHasNotPostedInRender =  (props) => {
    const [state, dispatch] = React.useContext(KeybaseContext);
    const [resultData, setResultData] = useState([{
      id:"Test",
      topic:"Test"
    }]);
    const my_columns =  ['id', 'topic']
    useEffect(() => {
      async function doAsync() {
        // console.log("team_name")
        // console.log(team_name)
        let myData = await QueryBuilder({
          "basic_aggs":"msg.channel.topic_name",
          "team_selected":state.graph_metadata.team_selected,
          "team_list":state.graph_metadata.team_list,
          "user_selected":state.graph_metadata.user_selected
        });
        // Compare the two lists
        // state.graph_metadata.team_list {list} .label
        // console.log("state.graph_metadata.team_list")
        // console.log(state.graph_metadata.team_list)
        // console.log("console.log(myData)")
        // console.log(myData)
        // console.log("myData.aggregations.departments.buckets") // {list} .key
        // console.log(myData.aggregations.departments.buckets)
        let mah_data = [];
        let full_topic_list = []
        let topics_posted_in = []
        state.graph_metadata.topic_list.forEach((thingy) => {
          if(thingy.label != "All Teams"){ // TODO
            full_topic_list.push(thingy.label)
          }
        })
        myData.table.forEach((thingy) => {
          topics_posted_in.push(thingy.key)
        })
        // console.log("topics_posted_in")
        // console.log(topics_posted_in)
        // console.log("full_topic_list")
        // console.log(full_topic_list)
        for (var i = 0; i < full_topic_list.length; i++){
          console.log("full_topic_list")
          if (full_topic_list.indexOf(topics_posted_in[i]) == -1) {
            mah_data.push({
              id: mah_data.length,
              topic: full_topic_list[i]
            })
          }
        }
        setResultData(mah_data)
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