import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Context } from '../Provider';


export default function LeftSidebar() {
  const [state2, dispatch] = React.useContext(Context);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (

    <Box 
      sx={{ 
        height:window.innerHeight*0.85, 
        overflow:"auto", 
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
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
    </Box>
  );

  return (
    <div height={window.innerHeight - 260} overflow="auto">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawer('left', true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}