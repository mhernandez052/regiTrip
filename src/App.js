import React from 'react';
import './App.css';

import Title from './components/Title'
import MapPlaceHolder from './components/MapPlaceHolder';
import CarInfo from './components/CarInfo';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LandingPage/>
      </header>
    </div>
  );
}

export default App;
