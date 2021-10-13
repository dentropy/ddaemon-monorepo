import React, { useState, useEffect, useContext } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Context } from './Context';
// messages|edits|deletes|reactions|URL's|reactions sent

export const Sidebar =  () => {
  const [context, setContext] = useContext(Context);
  console.log(context)
  // Gotta query a list of topics, user and team will work independently though
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Most _____</FormLabel>
      <RadioGroup
        aria-label="most_blank"
        defaultValue="messages"
        name="radio-buttons-group"
      >
        <FormControlLabel value="messages" control={<Radio />} label="messages" 
          onClick={() => {var tmpContext = context; tmpContext.most = "messages"; setContext(tmpContext)}} />
        <FormControlLabel value="edits" control={<Radio />} label="edits" 
          onClick={() => {var tmpContext = context; tmpContext.most = "edits"; console.log(tmpContext);setContext(tmpContext)}}  />
        <FormControlLabel value="deletes" control={<Radio />} label="deletes" 
          onClick={() => {var tmpContext = context; tmpContext.most = "deletes"; console.log(tmpContext);setContext(tmpContext)}} />
        <FormControlLabel value="reactions_sent" control={<Radio />} label="reactions sent"
          onClick={() => {var tmpContext = context; tmpContext.most = "reaction"; console.log(tmpContext);setContext(tmpContext)}}  />
      </RadioGroup>
      <FormLabel component="legend">per _____</FormLabel>
      <RadioGroup
        aria-label="per <Blank>"
        defaultValue="team"
        name="radio-buttons-group"
      >
        <FormControlLabel value="user" control={<Radio />} label="User" 
          onClick={() => {var tmpContext = context; tmpContext.per = "msg.sender.username"; console.log(tmpContext);setContext(tmpContext)}} />
        <FormControlLabel value="team" control={<Radio />} label="Across team" 
          onClick={() => {var tmpContext = context; tmpContext.per = "msg.channel.name"; console.log(tmpContext);setContext(tmpContext)}} />
        <FormControlLabel value="topic" control={<Radio />} label="Topic" 
          onClick={() => {var tmpContext = context; tmpContext.per = "msg.channel.topic_name"; console.log(tmpContext);setContext(tmpContext)}} />
      </RadioGroup>
    </FormControl>
  );
}