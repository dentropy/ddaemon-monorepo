import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import { RenderBasicGraph } from './components/RenderBasicGraph';
import { SelectFromList } from './components/SelectFromList';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Sidebar } from './components/Sidebar';
import { Context } from './components/Context';
import { RenderIntermediateGraph } from './components/RenderIntermediateGraph';
import { ElasticQuerier } from './components/ElasticQuerier';

function App() {
  const [context, setContext] = useState();
  const [interestingGraph, setInterestingGraph] = useState(<h1>Loading</h1>);
  useEffect(() => {
    let default_context = {
      "most":"text",
      "per" :"msg.sender.username"
    }
    setContext(default_context)
    setInterestingGraph(<RenderIntermediateGraph hello="world" per={default_context.per} most={default_context.most} />)
    console.log("context")
    console.log(context)
  }, [])
  function renderNewGraph() {
    if (context == undefined){
      setInterestingGraph(<h1>Error wrong input data</h1>)
    }
    else {
      setInterestingGraph(<RenderIntermediateGraph hello="world" per={context.per} most={context.most} />)
    }
  }
  // "msg.channel.topic_name.keyword" // "msg.content.type" // msg.sender.username
  return (
    <div className="App">
      <Context.Provider value={[context, setContext]}>
      <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 2">
                <Sidebar />
              </Box>
              <Box gridColumn="span 10">
                <button onClick={() => {console.log(context)}}>print context</button>
                <button onClick={() => {renderNewGraph()}}>Render new graph</button>
                {interestingGraph}
              </Box>
          </Box>
      </Box>
      </Context.Provider>
    </div>
  );
}

export default App;
