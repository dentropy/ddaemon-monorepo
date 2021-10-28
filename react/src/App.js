import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import { KeybaseListTopicsUserPostedInRender } from './components/keybase-binding/KeybaseListTopicsUserPostedInRender';
import { Context } from './Provider';
import PrimarySearchAppBar from './components/AppBar';
import { KeybaseSetGraph } from './components/keybase-binding/KeybaseSetGraph';
import { KeybaseListTopicsUserHasNotPostedInRender } from './components/keybase-binding/KeybaseListTopicsUserHasNotPostedInRender'
import { KeybaseListUsersThatHasNotPostedInTopic} from './components/keybase-binding/KeybaseListUsersThatHasNotPostedInTopic'
import { KeybaseListListUserThatHasPostedInTopic } from './components/keybase-binding/KeybaseListListUserThatHasPostedInTopic'
function App() {
  let graph_height= window.innerHeight * 0.5
  let graph_width= window.innerWidth * 0.8
  const [interestingGraph, setInterestingGraph] = useState(<h1>Loading</h1>);
  const [state, dispatch] = useContext(Context);
  
  useEffect(() => {
    setInterestingGraph(<KeybaseSetGraph 
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
        return setInterestingGraph(<KeybaseSetGraph 
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
