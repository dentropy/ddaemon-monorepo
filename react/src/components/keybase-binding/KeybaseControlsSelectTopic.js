import React, {useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Context } from '../../Provider';
import { QueryBuilder } from '../helper-functions/QueryBuilder';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { KeybaseReducer  } from './KeybaseReducer'

export const KeybaseGetTopics = () => {
  
}


export const KeybaseControlsSelectTopic =  () => {
    //const [state, dispatch] = useContext(Context);
    const [state, dispatch] = React.useContext(KeybaseContext);
    
    function set_team(input, value) {
      console.log(input)
      console.log(value.label)
      // if(value.label == "All Teams")
      // {
      //   console.log("ALL TEAMS GO")
      //   console.log("*")
      //   dispatch({
      //     type: "TOPIC_SELECT",
      //     payload: "*"
      //   })
      // } else {
      //   dispatch({
      //     type: "TOPIC_SELECT",
      //     payload: value.label
      //   })
      // }
      dispatch({
        type: "TOPIC_SELECT",
        payload: value
      })
    }
    useEffect(() => {
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
      KeybaseGetTopics()
    }, [state.graph_metadata])
    return (
      <>
        <Autocomplete
            disablePortal
            onChange={set_team}
            id="combo-box-demo"
            options={state.graph_metadata.topic_list}
            value={state.graph_metadata.topic_selected}
            sx={{ 
              width: window.innerWidth / 12 * 2 - 36,
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
