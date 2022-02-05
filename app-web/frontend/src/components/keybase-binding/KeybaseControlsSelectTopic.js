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
