import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { Context } from './Provider';
import PrimarySearchAppBar from './components/AppBar'

import KeybaseProvider from './components/keybase-binding/KeybaseProvider'
import KeybaseRoot from './components/keybase-binding/KeybaseRoot'

import DiscordRoot from './components/discord-binding/DiscordRoot'




function App() {
  const [state, dispatch] = useContext(Context);

  const dashboardAppSelect = (param) => {
    switch(param) {
      case 'keybase':
        return       <KeybaseProvider><KeybaseRoot /></KeybaseProvider>;
      case 'discord':
        return <DiscordRoot />;
      case 'matrix':
        return <h1>Matrix Root TODO</h1>;
      case 'IRC':
        return <h1>IRC Root TODO</h1>;
      default:
        return 'foo';
    }
  }

  return (
    <div className="App">
      <PrimarySearchAppBar />
        {dashboardAppSelect(state.dashboard_select)}
    </div>
  );
}

export default App;
