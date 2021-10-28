import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import { KeybaseListTopicsUserPostedInRender } from './components/keybase-binding/KeybaseListTopicsUserPostedInRender';
import { Context } from './Provider';
import PrimarySearchAppBar from './components/AppBar';
import { KeybaseSetGraphBar } from './components/keybase-binding/KeybaseSetGraphBar';
import { KeybaseListTopicsUserHasNotPostedInRender } from './components/keybase-binding/KeybaseListTopicsUserHasNotPostedInRender'
import { KeybaseListUsersThatHasNotPostedInTopic} from './components/keybase-binding/KeybaseListUsersThatHasNotPostedInTopic'
import { KeybaseListListUserThatHasPostedInTopic } from './components/keybase-binding/KeybaseListListUserThatHasPostedInTopic'
import  KeybaseControlsGraphBar from './components/keybase-binding/KeybaseControlsGraphBar'
import {KeybaseControlsSelectTeam} from './components/keybase-binding/KeybaseControlsSelectTeam';
import KeybaseQuerySelect from './components/keybase-binding/KeybaseQuerySelect';
import KeybaseControlsCheckWhoPosted from './components/keybase-binding/KeybaseControlsCheckWhoPosted';
import {KeybaseControlsSelectTopic} from './components/keybase-binding/KeybaseControlsSelectTopic';
import {KeybaseControlsSelectUser} from './components/keybase-binding/KeybaseControlsSelectUser';
import Button from '@mui/material/Button';

function App() {
  let graph_height= window.innerHeight / 12 * 10
  let graph_width= window.innerWidth / 12 * 9
  const [interestingGraph, setInterestingGraph] = useState(<h1>Loading</h1>);
  const [state, dispatch] = useContext(Context);
  
  useEffect(() => {
    setInterestingGraph(<KeybaseSetGraphBar 
      graph_height={graph_height} 
      graph_width={graph_width} 
      per={state.graph_metadata.per} 
      most={state.graph_metadata.most}
      team_selected={state.graph_metadata.team_selected} 
      /> );
  }, [])

  const renderGraph = () => {
    switch(state.graph_controls) {
      case 'MOST_PER':
        return setInterestingGraph(<KeybaseSetGraphBar 
          graph_height={graph_height} 
          graph_width={graph_width} 
          per={state.graph_metadata.per} 
          most={state.graph_metadata.most}
          team_selected={state.graph_metadata.team_selected} 
          /> );

      case 'WHO_HASNT_POSTED':
        return setInterestingGraph(<KeybaseListTopicsUserPostedInRender />)
        //return 'WHO_HASNT_POSTED';
      case 'TOPICS_NOT_POSTED_IN':
        return setInterestingGraph(<KeybaseListTopicsUserHasNotPostedInRender />)
      case 'REPLIES':
        return setInterestingGraph(<h1>REPLIES</h1>)
        //return 'REPLIES';
      case 'KeybaseListListUserThatHasPostedInTopic':
        return setInterestingGraph(<KeybaseListListUserThatHasPostedInTopic />)
      case 'ListUserThatHasNotPostedInTopic':
        return setInterestingGraph(<KeybaseListUsersThatHasNotPostedInTopic />)
      default:
        return setInterestingGraph(<h1>renderGraph Error</h1>)
        //return 'foo';
    }
  }

  const renderGraphControls = (param) => {
    switch(param) {
      case 'MOST_PER':
        return <KeybaseControlsGraphBar />;
      case 'WHO_HASNT_POSTED':
        return <h1>Placeholder</h1>//<KeybaseControlsCheckWhoPosted />;//'WHO_HASNT_POSTED';
      case 'REPLIES':
        return 'REPLIES';
      default:
        return 'foo';
    }
  }

  const dashboardSideBarLeft = (param) => {
    switch(param) {
      case 'keybase':
        return <div overflow="auto">
          <Button variant="contained" onClick={() => {renderGraph()}}>Render new graph</Button>
          <br />
          <br />
          <KeybaseControlsSelectTeam />
          <KeybaseControlsSelectTopic />
          <KeybaseControlsSelectUser />
          <p />
          <KeybaseQuerySelect /> 
          <Button variant="outlined" onClick={() => {console.log(state)}}>console.log state</Button>
          <br />
          <br />
          </div>
      case 'discord':
        return <h1>Discord AppBar</h1>;
      case 'matrix':
        return <h1>Matrix AppBar</h1>;
      case 'IRC':
        return <h1>IRC AppBar</h1>;
      default:
        return 'foo';
    }
  }

  const dashboardSideBarRight = (param) => {
    switch(param) {
      case 'keybase':
        return <>
          {renderGraphControls(state.graph_controls)}
        </>;
      case 'discord':
        return <h1>Discord AppBar</h1>;
      case 'matrix':
        return <h1>Matrix AppBar</h1>;
      case 'IRC':
        return <h1>IRC AppBar</h1>;
      default:
        return 'foo';
    }
  }

  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Box sx={{ width: 1 }} >
          <Box 
            display="grid" 
            gridTemplateColumns="repeat(12, 1fr)" 
            gap={2} 
            sx={{
              maxHeight: '80%',
              overflow: 'visible'
            }}
          >
              <Box gridColumn="span 2">
                {dashboardSideBarLeft(state.dashboard_select)}
              </Box>
              <Box gridColumn="span 8">
                {interestingGraph}
              </Box>
              <Box gridColumn="span 2">
                {dashboardSideBarRight(state.dashboard_select)}
              </Box>
          </Box>
      </Box>
    </div>
  );
}

export default App;
