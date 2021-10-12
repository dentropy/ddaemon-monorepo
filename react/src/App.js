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
function App() {
  const [context, setContext] = useState();
  useEffect(() => {
    setContext({
      "most":"message",
      "per" :"team"
    })
  }, [])
  return (
    <div className="App">
      <Context.Provider value={[context, setContext]}>
      <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 2">
                <Sidebar />
                {JSON.stringify(context)}
              </Box>
              <Box gridColumn="span 10">
                <button onClick={() => {console.log(context)}}>print context</button>
                <RenderBasicGraph />
              </Box>
          </Box>
      </Box>
      </Context.Provider>
    </div>
  );
}

export default App;
