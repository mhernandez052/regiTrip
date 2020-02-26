import React from 'react';
// import logo from './logo.svg';
import lion from './photos/lion.png';
import './App.css';


import Title from './components/Title'

function App() {
  return (
    <head>
      Senior Project
    </head>
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <img src={lion} className="App-logo" alt="logo" />
        <p>
          Hello from Pakistan
        </p>
        <a
          className="App-link"
          href="https://github.com/mhernandez052/regiTrip"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
