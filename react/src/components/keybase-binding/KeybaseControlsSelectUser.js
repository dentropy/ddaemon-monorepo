import React, {useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Context } from '../../Provider';
import { CheckElasticResponse } from '../helper-functions/CheckElasticResponse';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { KeybaseReducer  } from './KeybaseReducer'
import { QueryBuilder } from '../helper-functions/QueryBuilder';

export const KeybaseControlsSelectUser =  () => {
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
      //     type: "USER_SELECT",
      //     payload: "*"
      //   })
      // } else {
      //   dispatch({
      //     type: "USER_SELECT",
      //     payload: value.label
      //   })
      // }
      dispatch({
        type: "USER_SELECT",
        payload: value
      })
    }
    useEffect(() => {
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
      KeybaseSetUsers()
    }, [state.graph_metadata])
    return (
      <>
        <Autocomplete
            disablePortal
            onChange={set_team}
            id="combo-box-demo"
            options={state.graph_metadata.user_list}
            value={state.graph_metadata.user_selected}
            sx={{ 
              width: window.innerWidth / 12 * 2 - 36,
              position: 'relative',
              margin: 0.2,
              backgroundColor: 'white',
              opacity: 0.8
            }}
            renderInput={(params) => <TextField 
              {...params} 
              label={`${state.graph_metadata.team_selected} Users`}
            />}
        />
      </>
    )
}
