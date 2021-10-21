import React, { useContext } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { SelectFromList } from './SelectFromList';
import { Context } from '../Provider';
// messages|edits|deletes|reactions|URL's|reactions sent

export const Sidebar =  () => {
  const [state, dispatch] = useContext(Context);

  function increment() {
    dispatch({
      type: 'INCREMENT',
      payload: 1,
    });
  }

  function decrement() {
    dispatch({
      type: 'DECREMENT',
      payload: 1,
    });
  }
  return (
    <>
      <p>{state.count}</p>
      <button onClick={increment}>+</button>&nbsp;
      <button onClick={decrement}>-</button>
      <p>{state.most}</p>
      <p>{state.per}</p>
      <SelectFromList />
      <FormControl component="fieldset">
        <FormLabel component="legend">Most _____</FormLabel>
        <RadioGroup
          aria-label="most_blank"
          defaultValue="messages"
          name="radio-buttons-group"
        >
          <FormControlLabel value="messages" control={<Radio />} label="messages" 
            onClick={() => { dispatch({ type: "MOST", payload: "text"})}} />
          <FormControlLabel value="edits" control={<Radio />} label="edits" 
            onClick={() => { dispatch({ type: "MOST", payload: "edit"})}}  />
          <FormControlLabel value="deletes" control={<Radio />} label="deletes" 
            onClick={() => { dispatch({ type: "MOST", payload: "delete"})}} />
          <FormControlLabel value="reactions_sent" control={<Radio />} label="reactions sent"
            onClick={() => { dispatch({ type: "MOST", payload: "reaction"})}}  />
        </RadioGroup>
        <FormLabel component="legend">per _____</FormLabel>
        <RadioGroup
          aria-label="per <Blank>"
          defaultValue="user"
          name="radio-buttons-group"
        >
          <FormControlLabel value="user" control={<Radio />} label="User" 
            onClick={() => { dispatch({ type: "PER", payload: "msg.sender.username"})}} />
          <FormControlLabel value="team" control={<Radio />} label="Across team" 
            onClick={() => { dispatch({ type: "PER", payload: "msg.channel.name"})}} />
          <FormControlLabel value="topic" control={<Radio />} label="Topic" 
            onClick={() => { dispatch({ type: "PER", payload: "msg.channel.topic_name"})}} />
        </RadioGroup>
      </FormControl>
    </>
  );
}