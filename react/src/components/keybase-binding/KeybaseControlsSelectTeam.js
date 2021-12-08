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
      let tmp_topics = await QueryBuilder({
        "team_selected":state.graph_metadata.team_selected,
        "basic_aggs": "msg.conversation_id"
      })
      let tmp_topic_list = []
      for(var i = 0; i < tmp_topics.table.length; i++){
        tmp_topic_list.push(tmp_topics.table[i].key)
      }
      console.log("tmp_topics")
      console.log(tmp_topics)
      console.log(tmp_topic_list)
      let topic_list = [] 
      for(var i = 0; i < tmp_topic_list.length; i++){
        let tmp_single_topic = await QueryBuilder({
          "team_selected":state.graph_metadata.team_selected,
          "conversation_id":tmp_topic_list[i]
        })
        console.log("tmp_single_topic")
        console.log(tmp_single_topic)
        console.log(tmp_single_topic.hits.hits[0]._source.msg.channel.topic_name)
        topic_list.push(tmp_single_topic.hits.hits[0]._source.msg.channel.topic_name)
      }
      dispatch({
        type: 'TOPIC_UPDATE',
        payload: topic_list,
      })
      dispatch({
        type: 'TOPIC_SELECT',
        payload: topic_list[0],
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
