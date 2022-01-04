import React from 'react';
import { DiscordContext } from './DiscordProvider'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/system';

export const DiscordDataVizMostPerSidebar = () => {
    const [state, dispatch] = React.useContext(DiscordContext);


    React.useEffect(() => {
        async function doAsync (){
        }
        doAsync()
    }, [])

    return (
      <FormControl component="fieldset">
      <FormLabel component="legend">Graph type</FormLabel>
      <RadioGroup
        aria-label="Graph type"
        defaultValue="bar graph"
        name="radio-buttons-group"
      >
          <FormControlLabel value="bar graph" control={<Radio />} label="Bar Graph" 
            onClick={() => { dispatch({ type: "GRAPH_CONTROLS", payload: "MOST_PER_GRAPH_BAR"}) }} />
          <FormControlLabel value="pie chart" control={<Radio />} label="Pie Chart" 
            onClick={() => { dispatch({ type: "GRAPH_CONTROLS", payload: "MOST_PER_GRAPH_PIE"})  }} />
        </RadioGroup>
      <FormLabel component="legend">Most _____</FormLabel>
      <RadioGroup
        aria-label="most_blank"
        defaultValue="text"
        name="radio-buttons-group"
      >
          <FormControlLabel value="text posts" control={<Radio />} label={"text posts"} 
              onClick={() => { dispatch({ type: "MOST", payload: "text posts"})}} />
          <FormControlLabel value="reactions" control={<Radio />} label={"reactions"} 
              onClick={() => { dispatch({ type: "MOST", payload: "reactions"})}} />
          <FormControlLabel value="urls" control={<Radio />} label={"urls"} 
              onClick={() => { dispatch({ type: "MOST", payload: "urls"})}} />
          <FormControlLabel value="attachments" control={<Radio />} label={"attachments"} 
              onClick={() => { dispatch({ type: "MOST", payload: "attachments"})}} />
      </RadioGroup>
      <FormLabel component="legend">per _____</FormLabel>
      <RadioGroup
        aria-label="per <Blank>"
        defaultValue="users"
        name="radio-buttons-group"
      >
          <FormControlLabel value="users" control={<Radio />} label="Users" 
            onClick={() => { dispatch({ type: "DISCORD_MOST_QUERY_SELECT", payload: "most_messages_per_user"})}} />
          <FormControlLabel value="channels" control={<Radio />} label="Channels" 
            onClick={() => { dispatch({ type: "DISCORD_MOST_QUERY_SELECT", payload: "channel_ids_to_channels"})}} />
          <FormControlLabel value="user" control={<Radio />} label="Specific user" 
            onClick={() => { dispatch({ type: "DISCORD_MOST_QUERY_SELECT", payload: "USER"})}} />
          <FormControlLabel value="topic" control={<Radio />} label="Specific Topic" 
            onClick={() => { dispatch({ type: "DISCORD_MOST_QUERY_SELECT", payload: "TOPIC"})}} />
        </RadioGroup>
      </FormControl>
    )
}