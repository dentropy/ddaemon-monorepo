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
import { CheckElasticResponse } from '../helper-functions/CheckElasticResponse';
export const KeybaseListTopicsUserHasPostedIn =  (props) => {
    const [state, dispatch] = React.useContext(KeybaseContext);
    const [graph, setGraph] = useState(<h1>Loading</h1>); // TODO
    const [resultData, setResultData] = useState([{
      id:"Test",
      topic:"Test"
    }]);
    const my_columns =  ['id', 'topic']
    useEffect(() => {
      async function doAsync() {
        console.log("useEffect")
        let team_name = state.team_selected
        if (!state.graph_metadata.team_list.includes(state.team_selected) && state.team_selected != "*") {
          team_name = "complexweekend.oct2020"
        }
        let myData = await QueryBuilder({
          "per":"msg.channel.topic_name",
          "graph_metadata":
            {  "team_selected":state.graph_metadata.team_selected,
               "team_list":state.graph_metadata.team_list,
               "user_selected":state.graph_metadata.user_selected,
               "topic_selected":state.graph_metadata.topic_selected
            }
        });
        let rendered_data = [];
        let mah_data = []
        console.log(myData)
        const columns = [
          { key: 'id', name: 'ID' },
          { key: 'topic', name: 'topic'}
        ]
        myData.table.forEach((thingy) => {
            console.log(thingy.key)
            mah_data.push({
              id: mah_data.length,
              topic: thingy.key
            })
            rendered_data.push(
                <>
                    <p>{thingy.key}</p>
                </>
            )
        })
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
          {graph}
        </div>
    )
}