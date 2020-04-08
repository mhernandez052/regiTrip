import React from 'react';
import './App.css';

import Title from './components/Title'
import MapPlaceHolder from './components/MapPlaceHolder';
import CarInfo from './components/CarInfo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <MapPlaceHolder />
        <CarInfo />
      </header>
    </div>
  );
}

export default App;
