import React, { Component } from 'react'
import '../App.css';
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from '../component/weather.component';
import Form from '../component/form.component';

// obscure the API key a little bit. If someone really wants to steal this free API key
// they can figure it out but hopefully it won't be as easy to pick up with a bot
const API_Token_A = process.env.REACT_APP_ACCESS_TOKEN_A;  //+ String.fromCharCode(100);
const API_Token_B = process.env.REACT_APP_ACCESS_TOKEN_B;
const API_key = API_Token_A + API_Token_B;

export default class WeatherWidget extends Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Fog: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  calculateTemp(temp) {
    let f = Math.floor((( temp - 273.15) * 1.8) + 32);
    return f;
  }

  getWeatherIcon(icons, rangeId) {
    switch(true){
      case rangeId >= 0 && rangeId <=299:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <=399:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <=599:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rangeId >= 600 && rangeId <=699:
        this.setState({icon: this.weatherIcon.Snow});
        break;
      case rangeId >= 700 && rangeId <=799:
        this.setState({icon: this.weatherIcon.Fog});
        break;
      case rangeId === 800:
        this.setState({icon: this.weatherIcon.Clear});
        break;
      case rangeId > 800:
        this.setState({icon: this.weatherIcon.Clouds});
        break;
      default:
        this.setState({icon: this.weatherIcon.Clouds});
    }
  }

  getWeather = async(e) => {
    e.preventDefault();
    const city= e.target.elements.city.value;
    const country= e.target.elements.country.value;
    if(city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      const response = await api_call.json(); 
      if (response.cod === "404")  {
        this.setState({error: true});
      } else {
        console.log(response);
        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          temp: this.calculateTemp(response.main.temp),
          temp_min: this.calculateTemp(response.main.temp_min),
          temp_max: this.calculateTemp(response.main.temp_max),
          description: response.weather[0].description,
          error: false
        });
        this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
      }
    } else {
      this.setState({error: true});
    }
  };

  render() {
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather 
          city={this.state.city} 
          country={this.state.country} 
          temp={this.state.temp} 
          temp_min={this.state.temp_min} 
          temp_max={this.state.temp_max}
          description={this.state.description}
          icon={this.state.icon}
        />
      </div> 
    );
  }
}
 

