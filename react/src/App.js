import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import { Sidebar } from './components/Sidebar';
import { BarGraphRender } from './components/BarGraphRender';
import { CheckWhoPostedRender } from './components/CheckWhoPostedRender';
import { Context } from './Provider';
import PrimarySearchAppBar from './components/AppBar';
import { BarGraphSet } from './components/BarGraphSet';
function App() {
  let graph_height= window.innerHeight * 0.5
  let graph_width= window.innerWidth * 0.8
  const [interestingGraph, setInterestingGraph] = useState(<h1>Loading</h1>);
  const [state, dispatch] = useContext(Context);
  
  useEffect(() => {
    setInterestingGraph(<BarGraphSet 
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
        return setInterestingGraph(<BarGraphSet 
          graph_height={graph_height} 
          graph_width={graph_width} 
          per={state.graph_metadata.per} 
          most={state.graph_metadata.most}
          team_selected={state.graph_metadata.team_selected} 
          /> );

      case 'WHO_HASNT_POSTED':
        return setInterestingGraph(<CheckWhoPostedRender />)
        //return 'WHO_HASNT_POSTED';
      case 'REPLIES':
        return setInterestingGraph(<h1>REPLIES</h1>)
        //return 'REPLIES';
      default:
        return setInterestingGraph(<h1>renderGraph Error</h1>)
        //return 'foo';
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
              <Box gridColumn="span 12">
                <button onClick={() => {console.log(state)}}>print state</button>
                <button onClick={() => {renderGraph()}}>Render new graph</button>
                {interestingGraph}
              </Box>
          </Box>
      </Box>
    </div>
  );
}

export default App;
