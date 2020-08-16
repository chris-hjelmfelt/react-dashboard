import React from 'react';
import './App.css';
import WeatherWidget from './widgets/Weather'

function App() {
  return (
    <div className="App">
      <h1 className="main-title">Dashboard</h1>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <WeatherWidget />
          </div>
          <div className="col-6">
            <p className="mid-title">column two</p>
          </div>
        </div>
      </div>
      
     
    </div>
  );
}

export default App;
