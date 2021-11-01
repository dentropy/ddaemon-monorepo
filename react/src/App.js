import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import { KeybaseListTopicsUserHasPostedIn } from './components/keybase-binding/KeybaseListTopicsUserHasPostedIn';
import { Context } from './Provider';
import PrimarySearchAppBar from './components/AppBar';
import { KeybaseSetGraphBar } from './components/keybase-binding/KeybaseSetGraphBar';
import { KeybaseListTopicsUserHasNotPostedInRender } from './components/keybase-binding/KeybaseListTopicsUserHasNotPostedInRender'
import { KeybaseListUsersThatHasNotPostedInTopic} from './components/keybase-binding/KeybaseListUsersThatHasNotPostedInTopic'
import { KeybaseListUserThatHasPostedInTopic } from './components/keybase-binding/KeybaseListUserThatHasPostedInTopic'
import  KeybaseControlsGraphBar from './components/keybase-binding/KeybaseControlsGraphBar'
import {KeybaseControlsSelectTeam} from './components/keybase-binding/KeybaseControlsSelectTeam';
import KeybaseQuerySelect from './components/keybase-binding/KeybaseQuerySelect';
import KeybaseControlsCheckWhoPosted from './components/keybase-binding/KeybaseControlsCheckWhoPosted';
import {KeybaseControlsSelectTopic} from './components/keybase-binding/KeybaseControlsSelectTopic';
import {KeybaseControlsSelectUser} from './components/keybase-binding/KeybaseControlsSelectUser';
import Button from '@mui/material/Button';
import {KeybaseSetGraphPie}  from './components/keybase-binding/KeybaseSetGraphPie';
function App() {
  let graph_height= window.innerHeight / 12 * 10
  let graph_width= window.innerWidth / 12 * 8
  const [interestingGraph, setInterestingGraph] = useState(<h1>Loading</h1>);
  const [state, dispatch] = useContext(Context);
  
  useEffect(() => {
    setInterestingGraph(
      <>
      <Box gridColumn="span 8">
      <KeybaseSetGraphBar 
      graph_height={graph_height} 
      graph_width={graph_width} 
      per={state.graph_metadata.per} 
      most={state.graph_metadata.most}
      team_selected={state.graph_metadata.team_selected} 
      />
    </Box>
    <Box gridColumn="span 2">
      <KeybaseControlsGraphBar />
    </Box>
    </>
       );
  }, [])

  const renderGraph = () => {
    switch(state.graph_controls) {
      case 'MOST_PER_GRAPH_BAR':
        return setInterestingGraph(
          <>
          <Box gridColumn="span 8">
          <KeybaseSetGraphBar 
          graph_height={graph_height} 
          graph_width={graph_width} 
          per={state.graph_metadata.per} 
          most={state.graph_metadata.most}
          team_selected={state.graph_metadata.team_selected} 
          />
        </Box>
        <Box gridColumn="span 2">
          <KeybaseControlsGraphBar />
        </Box>
        </>
           );
      case 'MOST_PER_GRAPH_PIE':
        return setInterestingGraph(
          <>
          <Box gridColumn="span 8">
            <KeybaseSetGraphPie 
            graph_height={graph_height} 
            graph_width={graph_width} 
            per={state.graph_metadata.per} 
            most={state.graph_metadata.most}
            team_selected={state.graph_metadata.team_selected} 
            /> 
          </Box>
          <Box gridColumn="span 2">
            <KeybaseControlsGraphBar />
          </Box>
          </>
          );

      case 'WHO_HASNT_POSTED':
        return setInterestingGraph(
          <Box gridColumn="span 10">
            <KeybaseListTopicsUserHasPostedIn />
          </Box>
        
        )
        //return 'WHO_HASNT_POSTED';
      case 'TOPICS_NOT_POSTED_IN':
        return setInterestingGraph(
          <Box gridColumn="span 10">
            <KeybaseListTopicsUserHasNotPostedInRender />
          </Box>
        )
      case 'REPLIES':
        return setInterestingGraph(
          <Box gridColumn="span 10">
             <h1>REPLIES</h1>
          </Box>
         )
        //return 'REPLIES';
      case 'KeybaseListUserThatHasPostedInTopic':
        return setInterestingGraph(
          <Box gridColumn="span 10">
            <KeybaseListTopicsUserHasPostedIn />
          </Box>)
      case 'ListUserThatHasNotPostedInTopic':
        return setInterestingGraph(
          <Box gridColumn="span 10">
             <KeybaseListUsersThatHasNotPostedInTopic />
          </Box>
         )
      default:
        return setInterestingGraph(
          <Box gridColumn="span 10">
            <h1>renderGraph Error</h1>
          </Box>)
        //return 'foo';
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
              <>
              {interestingGraph}
              </>
          </Box>
      </Box>
    </div>
  );
}

export default App;
