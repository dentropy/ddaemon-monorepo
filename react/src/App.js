import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import { Sidebar } from './components/Sidebar';
import { BarGraphRender } from './components/BarGraphRender';
import { Context } from './Provider';
import PrimarySearchAppBar from './components/AppBar';
import BarGraphControls from './components/BarGraphControls';
import { BarGraphSet } from './components/BarGraphSet';
function App() {
  let graph_height= window.innerHeight * 0.5
  let graph_width= window.innerWidth * 0.8
  const [context, setContext] = useState();
  const [interestingGraph, setInterestingGraph] = useState(<h1>Loading</h1>);
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    let default_context = {
      "teams":{ label: 'getting teams' },
      "most":"text",
      "per" :"msg.sender.username"
    }
    setContext(default_context)
    setInterestingGraph(<BarGraphSet 
      graph_height={graph_height} 
      graph_width={graph_width} 
      per={state.per} 
      most={state.most}
      team_selected={state.team_selected} 
      />)
    console.log("context")
    console.log(context)
  }, [])
  function renderNewGraph() {
    if (state == undefined){
      setInterestingGraph(<h1>Error wrong input data</h1>)
    }
    else {
      setInterestingGraph(<BarGraphSet 
        graph_height={graph_height} 
        graph_width={graph_width} 
        per={state.per} 
        most={state.most}
        team_selected={state.team_selected} 
        /> )
    }
  }
  // "msg.channel.topic_name.keyword" // "msg.content.type" // msg.sender.username
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
              <Box gridColumn="span 12">
                <button onClick={() => {console.log(state)}}>print state</button>
                <button onClick={() => {renderNewGraph()}}>Render new graph</button>
                {interestingGraph}
              </Box>
          </Box>
      </Box>
    </div>
  );
}

export default App;
