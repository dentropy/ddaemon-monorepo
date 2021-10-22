import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import { Sidebar } from './components/Sidebar';
import { RenderIntermediateGraph } from './components/RenderIntermediateGraph';
import { Context } from './Provider';

function App() {
  let graph_height= window.innerHeight/2
  let graph_width= window.innerWidth/2
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
    setInterestingGraph(<RenderIntermediateGraph 
      graph_height={graph_height} 
      graph_width={graph_width} 
      per={state.per} 
      most={state.most}
      team_selected={state.team_selected} />)
    console.log("context")
    console.log(context)
  }, [])
  function renderNewGraph() {
    if (context == undefined){
      setInterestingGraph(<h1>Error wrong input data</h1>)
    }
    else {
      setInterestingGraph(<RenderIntermediateGraph 
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
      <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 2">
                <Sidebar />
              </Box>
              <Box gridColumn="span 10">
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
