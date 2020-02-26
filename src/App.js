import React from 'react';
import './App.css';

import Title from './components/Title'
import MapPlaceHolder from './components/MapPlaceHolder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <MapPlaceHolder />
        {/* <img src={lion} className="App-logo" alt="logo" /> */}
        <p>Hello from Pakistan</p>
      </header>
    </div>
  );
}

export default App;
