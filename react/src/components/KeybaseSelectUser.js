import React, {useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Context } from '../Provider';
export const KeybaseSelectUser =  () => {
    const [state, dispatch] = useContext(Context);
    function set_team(input, value) {
      console.log(input)
      console.log(value.label)
      if(value.label == "All Teams")
      {
        console.log("ALL TEAMS GO")
        console.log("*")
        dispatch({
          type: "TEAM_SELECT",
          payload: "*"
        })
      } else {
        dispatch({
          type: "TEAM_SELECT",
          payload: value.label
        })
      }
    }
    useEffect(() => {
      async function doAsync(){
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
                              "exists": {
                                  "field": "msg.channel.name"
                              }
                          }
                      ]
                  }
              },
              "aggs": {
                  "departments": {
                      "terms": {
                          "field": "msg.channel.name"
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
          type: 'TEAMS_UPDATE',
          payload: formatted_data.teams,
        });
      }
      doAsync()
    }, [])
    return (
      <>
        <Autocomplete
            disablePortal
            onChange={set_team}
            id="combo-box-demo"
            options={state.graph_metadata.team_list}
            sx={{ 
              width: 300,
              position: 'relative',
              margin: 0.2,
              backgroundColor: 'white',
              opacity: 0.8
            }}
            renderInput={(params) => <TextField 
              {...params} 
              label="Keybase Teams" 
            />}
        />
      </>
    )
}
