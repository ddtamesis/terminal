import React from 'react';
import logo from './logo.svg';
import './App.css';
import REPL from './REPL'

export const TEXT_app_header_accessible_name = "welcome header"

function App() {
  return (
    <div className="App">
      <header className="App-header" aria-label={TEXT_app_header_accessible_name}>
        Welcome to our terminal!
      </header>
      <REPL />
    </div>
  );

}

export default App;
