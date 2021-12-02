import React, {useContext, useEffect } from 'react';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { QueryBuilder } from '../helper-functions/QueryBuilder';
import { Grid } from "gridjs-react";

export const KeybaseControlsList =  () => {
    const [state, dispatch] = useContext(KeybaseContext);

    async function ListTopicsUserHasPostedIn(){
      let base_query = {
          "user_selected":state.graph_metadata.user_selected,
          "advanced_aggs": {
            "topics": {
              "terms": {
                  "field": "msg.channel.topic_name",
                  "size": 100
              },
              "aggs" : {
                "teams": {
                    "terms": {
                        "field": "msg.channel.name"
                    }
                }
              }
            }
          }
      }
      let formatted_data = await QueryBuilder(base_query);
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: {
          "data":[
            ['test', 'test@example.com'],
            ['test2', 'test2@gmail.com']
          ],
          "columns": ['Name', 'Email']
        }
      }) 
      console.log( "formatted_data" )
      console.log(  formatted_data  )
    }
    useEffect(() => {
      async function doAsync(){
        console.log("KeybaseControlsList useEffect")
      }
      doAsync()
    }, [])
    return (
      <>
            <button onClick={() => ListTopicsUserHasPostedIn()}>Render</button>
            <FormControl component="fieldset">
            <FormLabel component="legend">Query Select</FormLabel>
            <RadioGroup
                aria-label="query select"
                defaultValue="List topics user has posted in"
                name="radio-buttons-group"
            >
                <FormControlLabel 
                  value="List topics user has posted in"
                  label="List topics user has posted in"  
                  control={<Radio />} 
                  onClick={() => { 
                    dispatch({ type: "LIST_SELECT", payload: "ListTopicsUserHasPostedIn"})
                    }} 
                />
                <FormControlLabel 
                  value="List topics user has NOT posted in"
                  label="List topics user has NOT posted in"
                  control={<Radio />}  
                  onClick={() => { 
                    dispatch({ type: "LIST_SELECT", payload: "ListTopicsUserHasNOTPostedIn"})
                    }}
                />
                <FormControlLabel 
                  value="List teams user has posted in"
                  label="List teams user has posted in"
                  control={<Radio />}  
                  onClick={() => { 
                    dispatch({ type: "LIST_SELECT", payload: "ListTeamsUserHasPostedIn"})
                    }}
                />
                <FormControlLabel 
                  value="List Messages Reacted To Most In Topic"
                  label="List Messages Reacted To Most In Topic"
                  control={<Radio />} 
                  onClick={() => { 
                    dispatch({ type: "LIST_SELECT", payload: "ListMessagesReactedToMostInTopic"})
                  }}
                />
                <FormControlLabel 
                  value="List Users who have posted in topic"
                  label="List Users who have posted in topic"
                  control={<Radio />} 
                  onClick={() => {
                    dispatch({ type: "LIST_SELECT", payload: "ListUsersWhoHavePostedInTopic"})
                    }}
                />
                <FormControlLabel 
                  value="List Users who have NOT posted in topic"
                  label="List Users who have NOT posted in topic"
                  control={<Radio />} 
                  onClick={() => {
                    dispatch({ type: "LIST_SELECT", payload: "ListUsersWhoHaveNOTPostedInTopic"})
                    }}
                />
            </RadioGroup>
            </FormControl>
      </>
    )
}
