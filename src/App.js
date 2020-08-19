import React from 'react';
import './App.css';
import WeatherModule from './component/Weather'
import NewsModule from './component/News'

function App() {
  return (
    <div className="App">
      <h1 className="main-title">Dashboard</h1>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <WeatherModule />
          </div>
          <div className="col-6">            
            <NewsModule />           
          </div>
        </div>
      </div>
      
     
    </div>
  );
}

export default App;
