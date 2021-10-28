import React, {useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Context } from '../../Provider';
export const KeybaseSelectTopic =  () => {
    const [state, dispatch] = useContext(Context);
    function set_team(input, value) {
      console.log(input)
      console.log(value.label)
      if(value.label == "All Teams")
      {
        console.log("ALL TEAMS GO")
        console.log("*")
        dispatch({
          type: "TOPIC_SELECT",
          payload: "*"
        })
      } else {
        dispatch({
          type: "TOPIC_SELECT",
          payload: value.label
        })
      }
    }
    useEffect(() => {
      async function doAsync(){
        let tmp_team = "dentropydaemon"
        if (state.graph_metadata != undefined) {
          tmp_team = state.graph_metadata.team_selected
        }
        let myData = await (await fetch('/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            "index": "keybase-*",
            "query": {
              "query": {
                  "bool": {
                      "must": [
                          {
                            "match": {
                              "msg.channel.name": {
                                "query": tmp_team
                              }
                            }
                          },
                          {
                              "exists": {
                                  "field": "msg.channel.topic_name"
                              }
                          }
                      ]
                  }
              },
              "aggs": {
                  "departments": {
                      "terms": {
                          "field": "msg.channel.topic_name",
                          "size": 100
                      }
                  }
              },
            "size": 0
          }
          })
        })).json()
        console.log("Getting teams")
        let formatted_data = {'teams':[]}
        console.log("MYDATA")
        console.log(myData.aggregations.departments.buckets)
        console.log(Object.keys(myData.aggregations))
        myData.aggregations.departments.buckets.forEach((thingy) => {
          let tmp_thingy = thingy;
          thingy.label = tmp_thingy.key;
          delete thingy.key;
          console.log(thingy)
          formatted_data.teams.push(tmp_thingy)
        })
        formatted_data.teams.push({ label: "All Teams" })
        console.log(formatted_data.teams)
        dispatch({
          type: 'TOPIC_UPDATE',
          payload: formatted_data.teams,
        });
      }
      doAsync()
    }, [state.graph_metadata])
    return (
      <>
        <Autocomplete
            disablePortal
            onChange={set_team}
            id="combo-box-demo"
            options={state.graph_metadata.topic_list}
            sx={{ 
              width: 390,
              position: 'relative',
              margin: 0.2,
              backgroundColor: 'white',
              opacity: 0.8
            }}
            renderInput={(params) => <TextField 
              {...params} 
              label={`${state.graph_metadata.team_selected} Topics`}
            />}
        />
      </>
    )
}
