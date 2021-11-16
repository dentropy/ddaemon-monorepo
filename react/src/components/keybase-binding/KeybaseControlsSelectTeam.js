import React, {useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Context } from '../../Provider';
import { CheckElasticResponse } from '../helper-functions/CheckElasticResponse';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { KeybaseReducer  } from './KeybaseReducer'
export const KeybaseControlsSelectTeam =  () => {
    // const [state, dispatch] = useContext(Context);
    const [state, dispatch] = React.useContext(KeybaseContext);

    function set_topics(input){
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
                                "query": input
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
        // console.log("Getting teams")
        let formatted_data = {'teams':[]}
        // console.log("MYDATA")
        // console.log(myData.aggregations.departments.buckets)
        // console.log(Object.keys(myData.aggregations))
        if(CheckElasticResponse(myData)){
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
        else {
          console.log("KeybaseControlsSelectTeam else")
        }
      doAsync()
    }
  }

    function set_users(input){
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
                                "query": input
                              }
                            }
                          },
                          {
                              "exists": {
                                  "field": "msg.sender.username"
                              }
                          }
                      ]
                  }
              },
              "aggs": {
                  "departments": {
                      "terms": {
                          "field": "msg.sender.username",
                          "size": 100
                      }
                  }
              },
            "size": 0
          }
          })
        })).json()
        // console.log("Getting teams")
        let formatted_data = {'teams':[]}
        // console.log("MYDATA")
        // console.log(myData.aggregations.departments.buckets)
        // console.log(Object.keys(myData.aggregations))
        
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
          type: 'USER_UPDATE',
          payload: formatted_data.teams,
        });
      }
      doAsync()
    }
    function set_team(input, value) {
      console.log(input)
      console.log(value.label)
      set_topics(value.label)
      set_users(value.label)
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
                          "field": "msg.channel.name",
                          "size": 100
                      }
                  }
              },
            "size": 0
          }
          })
        })).json()
        // console.log("Getting teams")
        let formatted_data = {'teams':[]}
        // console.log("MYDATA")
        // console.log(myData.aggregations.departments.buckets)
        // console.log(Object.keys(myData.aggregations))
        if(CheckElasticResponse(myData)){ 
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
        } else {
          console.log("KeybaseControlsSelectTeam else")
        }
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
            value={state.graph_metadata.team_selected}
            sx={{ 
              width: window.innerWidth / 12 * 2 - 36,
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
