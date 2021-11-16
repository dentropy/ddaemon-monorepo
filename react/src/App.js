import React, { useState, useEffect, useContext } from 'react';
import './App.css';
// import { Context } from './Provider';
import PrimarySearchAppBar from './components/AppBar'
import KeybaseProvider, { KeybaseContext } from './components/keybase-binding/KeybaseProvider'
import KeybaseRoot from './components/keybase-binding/KeybaseRoot'
function App() {
  // const [state, dispatch] = useContext(Context);

  return (
    <div className="App">
      <PrimarySearchAppBar />
      <KeybaseProvider>
        <KeybaseRoot />
      </KeybaseProvider>
    </div>
  );
}

export default App;
