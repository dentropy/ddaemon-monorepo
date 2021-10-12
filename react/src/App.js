import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import { RenderBasicGraph } from './components/RenderBasicGraph';
import { SelectFromList } from './components/SelectFromList';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
function App() {

  return (
    <div className="App">
      <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 2">
                <SelectFromList />
              </Box>
              <Box gridColumn="span 10">
                <RenderBasicGraph />
              </Box>
          </Box>
      </Box>
    </div>
  );
}

export default App;
