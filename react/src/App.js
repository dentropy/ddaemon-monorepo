import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import { RenderBasicGraph } from './components/RenderBasicGraph';
import { SelectFromList } from './components/SelectFromList';
function App() {

  return (
    <div className="App">
       <SelectFromList />
       <RenderBasicGraph />
    </div>
  );
}

export default App;
