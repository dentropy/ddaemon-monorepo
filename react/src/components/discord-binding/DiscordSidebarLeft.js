import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DiscordContext } from './DiscordProvider'
import { DiscordGetGuilds } from './DiscordBackend';
import { DiscordGetChannels } from './DiscordBackend';
import { DiscordGetUsers } from './DiscordBackend';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const DiscordSidebarLeft = () => {
    const [state, dispatch] = React.useContext(DiscordContext);

    async function getChannels(guild_id){
        async function doAsync (){
            let return_obj = await DiscordGetChannels(guild_id)
            dispatch({
                type: 'DISCORD_CHANNEL_LIST',
                payload: return_obj
            })
            dispatch({
                type: 'DISCORD_CHANNEL_SELECTED',
                payload: Object.keys(return_obj)[0]
            })
        }
        doAsync()
    }

    async function getUsers(guild_id){
        async function doAsync (){
            let return_obj = await DiscordGetUsers(guild_id)
            dispatch({
                type: 'DISCORD_USER_LIST',
                payload: return_obj
            })
            dispatch({
                type: 'DISCORD_USER_SELECTED',
                payload: Object.keys(return_obj)[0]
            })
        }
        doAsync()
    }

    React.useEffect(() => {
        async function doAsync (){
            let return_obj = await DiscordGetGuilds()
            dispatch({
                type: 'DISCORD_GUILD_LIST',
                payload: return_obj
            })
            dispatch({
                type: 'DISCORD_GUILD_SELECTED',
                payload: Object.keys(return_obj)[0]
            })
            console.log("Brain Fuck")
            console.log(state.discord_guild_selected)
            console.log(return_obj)
            console.log(return_obj[state.discord_guild_selected].guild_id)
            getChannels(return_obj[state.discord_guild_selected].guild_id)
            getUsers(return_obj[state.discord_guild_selected].guild_id)
        }
        doAsync()
    }, [])

    React.useEffect(() => {

    }, [state.discord_guild_selected])

    return (
      <div overflow="auto">
        {/* <Button variant="contained" onClick={() => {renderGraph()}}>Render new graph</Button> */}
        <br />
        <br />
        <Autocomplete
            disablePortal
            // onChange={set_team}
            id="combo-box-demo"
            options={Object.keys(state.discord_guild_list)}
            value={state.discord_guild_selected}
            sx={{ 
              width: window.innerWidth / 12 * 2 - 36,
              position: 'relative',
              margin: 0.2,
              backgroundColor: 'white',
              opacity: 0.8
            }}
            renderInput={(params) => <TextField 
              {...params} 
              label={`Discord Guild Select`}
            />}
        />
        <Autocomplete
            disablePortal
            // onChange={set_team}
            id="combo-box-demo"
            options={Object.keys(state.discord_channel_list)}
            value={state.discord_channel_selected}
            sx={{ 
              width: window.innerWidth / 12 * 2 - 36,
              position: 'relative',
              margin: 0.2,
              backgroundColor: 'white',
              opacity: 0.8
            }}
            renderInput={(params) => <TextField 
              {...params} 
              label={`${state.discord_guild_selected} Channels`}
            />}
        />
        <Autocomplete
            disablePortal
            // onChange={set_team}
            id="combo-box-demo"
            options={Object.keys(state.discord_user_list)}
            value={state.discord_user_selected}
            sx={{ 
              width: window.innerWidth / 12 * 2 - 36,
              position: 'relative',
              margin: 0.2,
              backgroundColor: 'white',
              opacity: 0.8
            }}
            renderInput={(params) => <TextField 
              {...params} 
              label={`${state.discord_guild_selected} Users`}
            />}
        />
        <RadioGroup
              aria-label="query select"
              defaultValue="Activity Per Time"
              name="radio-buttons-group"
          >
              <FormControlLabel 
                value="Activity Per Time"
                label="Activity Per Time"  
                control={<Radio />} 
                onClick={() => { 
                  dispatch({ type: "DATA_VIZ_SELECT", payload: "ACTIVITY_PER_TIME"})
                  }} 
              />
              <FormControlLabel 
                value="General Search Query"
                label="General Search Query"
                control={<Radio />}  
                onClick={() => { 
                  dispatch({ type: "DATA_VIZ_SELECT", payload: "KeybaseControlsGeneralSearch"})
                  }}
              />
              <FormControlLabel 
                value="List Creator"
                label="List Creator"
                control={<Radio />}  
                onClick={() => { 
                  dispatch({ type: "DATA_VIZ_SELECT", payload: "KeybaseControlsList"})
                  }}
              />
          </RadioGroup>
        <Button variant="outlined" onClick={() => {console.log(state)}}>console.log state</Button>
        <br />
        <br />
      </div>
    )
  }