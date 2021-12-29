import React, {useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Context } from '../../Provider';
import { CheckElasticResponse } from '../helper-functions/CheckElasticResponse';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { KeybaseReducer  } from './KeybaseReducer'
import { QueryBuilder } from '../helper-functions/QueryBuilder';

export const KeybaseControlsSelectTeam =  () => {
    // const [state, dispatch] = useContext(Context);
    const [state, dispatch] = React.useContext(KeybaseContext);

    async function KeybaseGetTopics(){
      let topics = await QueryBuilder({
        "team_selected":state.graph_metadata.team_selected,
        "advanced_aggs": {
          "topics": {
            "terms": {
                "field": "msg.conversation_id",
                "size": 100
            },
            "aggs" : {
              "teams": {
                  "terms": {
                      "field": "msg.channel.topic_name"
                  }
              }
            }
          }
        }
      })
      let mah_topics = []
      for(var i = 0; i < topics.aggregations.topics.buckets.length; i++){
        console.log(topics.aggregations.topics.buckets[i])
        if(topics.aggregations.topics.buckets[i].teams.buckets.length == 1){
          mah_topics.push(topics.aggregations.topics.buckets[i].teams.buckets[0].key)
        }
        else {
          let tmp_topic = await QueryBuilder({
            "conversation_id":topics.aggregations.topics.buckets[i].key
          })
          mah_topics.push(tmp_topic.hits.hits[0]._source.msg.channel.topic_name)
        }
      }
      console.log(mah_topics)
      dispatch({
        type: 'TOPIC_UPDATE',
        payload: mah_topics,
      })
      dispatch({
        type: 'TOPIC_SELECT',
        payload: mah_topics[0],
      })
    }

    async function KeybaseSetUsers(){
      let tmp_teams = await QueryBuilder({
        "team_selected": state.graph_metadata.team_selected,         
        "basic_aggs": "msg.sender.username"
      })
      console.log("KeybaseControlsSelectTeam")
      console.log(tmp_teams)
      tmp_teams.only = []
      for(var i = 0; i < tmp_teams.table.length; i++){
        tmp_teams.only.push(tmp_teams.table[i].key)
      }
      dispatch({
        type: 'USER_UPDATE',
        payload: tmp_teams.only
      });
      dispatch({
        type: 'USER_SELECT',
        payload: tmp_teams.only[0]
      });
    }

    function set_team(input, value) {
      console.log("set_team")
      console.log(input)
      console.log(value.label)
      console.log(value)
      KeybaseGetTopics(value)
      KeybaseSetUsers(value)
      dispatch({
        type: "TEAM_SELECT",
        payload: value
      })
    }
    useEffect(() => {
      async function doAsync(){
        let tmp_teams = await QueryBuilder({
          "basic_aggs": "msg.channel.name"
        })
        console.log("KeybaseControlsSelectTeam")
        console.log(tmp_teams)
        tmp_teams.only = []
        for(var i = 0; i < tmp_teams.table.length; i++){
          tmp_teams.only.push(tmp_teams.table[i].key)
        }
        dispatch({
          type: 'TEAMS_UPDATE',
          payload: tmp_teams.only
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
