import React from 'react';
import { getCurrentWeatherByCity } from 'api/weather';
import './App.css';

interface AppState {
  weather?: any;
}

class App extends React.Component<{}, AppState> {
  inputRef: React.RefObject<HTMLInputElement>;
  state: AppState = {};

  constructor(props: {}) {
    super(props);

    // Store a reference to the text input to retrieve its value
    this.inputRef = React.createRef();
  }

  getWeather = async () => {
    try {
      const weather = await getCurrentWeatherByCity(this.inputRef.current?.value);
      this.setState({
        weather
      });
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { weather } = this.state;

    return (
      <div className="App">
        <div>
          <input ref={this.inputRef} type="text" />
          <button onClick={this.getWeather}>Get weather!</button>
        </div>
        {
          weather && (
            <div>
              <img src={weather.icon} alt={weather.description} />
              <p>{weather.temperature} °C</p>
              <p>{weather.description}</p>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
