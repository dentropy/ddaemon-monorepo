import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import { KeybaseSetGraphBar } from './KeybaseSetGraphBar';
import  KeybaseControlsDataViz from './KeybaseControlsDataViz'
import {KeybaseControlsSelectTeam} from './KeybaseControlsSelectTeam';
import KeybaseQuerySelect from './KeybaseQuerySelect';
import KeybaseControlsCheckWhoPosted from './KeybaseControlsCheckWhoPosted';
import {KeybaseControlsSelectTopic} from './KeybaseControlsSelectTopic';
import {KeybaseControlsSelectUser} from './KeybaseControlsSelectUser';
import Button from '@mui/material/Button';
import {KeybaseSetGraphPie}  from './KeybaseSetGraphPie';
import { KeybaseSetUserGraphPie } from './KeybaseSetUserGraphPie'
import { KeybaseListMessagesReactedToMostInTopic } from './KeybaseListMessagesReactedToMostInTopic'
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { KeybaseReducer  } from './KeybaseReducer'
import {KeybaseListSearchResults} from './KeybaseListSearchResults'
import {KeybaseControlsGeneralSearch} from './KeybaseControlsGeneralSearch'
import {KeybaseControlsList} from './KeybaseControlsList'
import { Grid } from "gridjs-react";

function KeybaseRoot() {
  let graph_height= window.innerHeight - 275
  let graph_width= window.innerWidth / 12 * 8
  let height_under_appbar = window.innerHeight - 115;
  const [interestingGraph, setInterestingGraph] = useState(<h1>Loading</h1>);
  const [state, dispatch] = useContext(KeybaseContext);
  //const [keybaseState, keybaseDispatch] = useContext(KeybaseContext);
  
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
      <Box gridColumn="span 2" height={height_under_appbar} overflow="auto">
        <KeybaseControlsDataViz />
      </Box>
    </>
       );
  }, [])

  const renderGraph = () => {
    switch(state.data_viz_controls) {
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
        <Box gridColumn="span 2" height={height_under_appbar} overflow="auto">
          <KeybaseControlsDataViz />
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
          <Box gridColumn="span 2" height={height_under_appbar} overflow="auto">
            <KeybaseControlsDataViz />
          </Box>
          </>
          );
      case 'KeybaseControlsList':
        return setInterestingGraph(
          <>
          <Box gridColumn="span 8">
            <Grid
              data={state.list_rendered.data}
              columns={state.list_rendered.columns}
              search={true}
              pagination={{
                enabled: true,
                limit: 10,
              }}
            />
          </Box>
          <Box gridColumn="span 2" height={height_under_appbar} overflow="auto">
            <KeybaseControlsList />
          </Box>
          </>
          );
      case 'KeybaseControlsGeneralSearch':
        setInterestingGraph(<h1>RESET</h1>)
        return setInterestingGraph(
          <Box gridColumn="span 10">
            <KeybaseListSearchResults search_phrase={state.graph_metadata.general_search_phrase}/>
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


  const dashboardSideBarLeft = () => {
    return (
      <div overflow="auto">
        <Button variant="contained" onClick={() => {renderGraph()}}>Render new graph</Button>
        <br />
        <br />
        <KeybaseControlsSelectTeam />
        <KeybaseControlsSelectTopic />
        <KeybaseControlsSelectUser />
        <KeybaseControlsGeneralSearch />
        <p />
        <KeybaseQuerySelect /> 
        <Button variant="outlined" onClick={() => {console.log(state)}}>console.log state</Button>
        <br />
        <br />
      </div>
    )
    }


  return (
    <div className="App">
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
                <Box gridColumn="span 2" height={height_under_appbar} overflow="auto">
                  {dashboardSideBarLeft()}
                </Box>
                <>
                {interestingGraph}
                </>
            </Box>
        </Box>
    </div>
  );
}

export default KeybaseRoot;
