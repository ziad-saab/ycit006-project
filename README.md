# TypeScript + React Project for YCIT006
For this final project, you'll be taking an existing weather app, fixing its types, and adding new features to it!

The app talks to the [OpenWeather API](https://openweathermap.org/api) to retrieve the current weather for a user-provided city, then displays some basic weather information retrieved from the API.

Read the following instructions carefully and make sure you don't miss any steps. Have fun :)

## Getting started
1. Download `ycit006-project.zip`, extract it, move to the directory where it was extracted, and run `npm install` to get all the dependencies.

2. The package you downloaded is composed of lots of files, but there are few key ones you should familiarize yourself with:

    * `src/components/App.tsx`: This is the main -- and only for now -- React component of the weather application
    * `src/api/weather.ts`: This module exposes a single function `getCurrentWeatherByCity`
  
    Take your time to go through the code in the files mentioned above. Make sure you understand the relationship between the two files (modules), as well as the logic inside them.

3. [Sign up to OpenWeather API](https://home.openweathermap.org/users/sign_up).

4. Once signed up, go to the [OpenWeather API keys page](https://home.openweathermap.org/api_keys), and find the Default API key associated with your account. It will look like `9f3115eb66e6b555a40c00839d034c4a`.

5. Edit the `src/api/weather.ts` file, replacing the value of `API_KEY` with your own.

6. From your terminal, run `npm run start`. Then, open your browser and navigate to `http://localhost:3000`. You should see the app in action. Try it out by typing a city name in the text input field and clicking on 'Get weather!'.

7. Once you are confident that you understand how the logic is operating, you can start working on the project!

## Instructions
The work you have to do is divided in two sections: "Required work" and "Optional work". To successfully complete the project, you have to complete the "Required work" section, and **at least one item** from the "Optional work" section. Completing more than one item from the "Optional work" section will not give you more points, but if you intend to add this project to your job search portfolio, you're encouraged to continue working on it even after the course has ended!

### Required work

#### `/src/api/weather.ts`
The local weather API module is far from where it needs to be in terms of types. Let's fix that!

1. You'll find three (3) places where variables are manually typed as `any`. Fix these by choosing a more appropriate type for them.
2. The weather API module defines an interface called `CurrentWeatherResponse`, which is supposed to represent the JSON response returned from calls to the weather API. This interface is incomplete. Go to the [documentation for the OpenWeather "Current weather data" API JSON response](https://openweathermap.org/current#current_JSON), and complete the `CurrentWeatherResponse` interface based on the sample data in the documentation.
3. You'll notice that the `CurrentWeatherResponse` interface isn't used anywhere. In the `getCurrentWeatherByCity` function, the call to `fetchJson` is currently returning type `any`. This is to be expected because parsing a JSON document can litteraly return *anything*. Use a type assertion to convert `weatherData` to a `CurrentWeatherResponse` type.
4. Finally, you'll notice that the temperature value returned by `getCurrentWeatherByCity` is a decimal number, which isn't desirable for display purposes. Round the value before returning it from the function.

#### `/src/components/App.tsx`
The `App` React component is created using a class that extends `React.Component`, which is a generic class. Since `App` doesn't take any props, the first type parameter passed to `React.Component` is `{}`, which is exactly what it needs to be. The second type parameter is set to `AppState`, which is currently defined as an interface with an optional `weather` property set to `any`.

Fix this by importing the `CurrentWeather` interface from the weather API module, and setting it as the type of the `weather` property of `AppState`.

### Optional work
**As stated in the instructions above, you must complete any one of the following items.**

#### Option #1
Create a correctly typed component for displaying the weather. Notice that in the `render()` method of the `App` component, the part that says `weather && ...` is displaying the current weather using a `div`. This is a prime candidate for a separate component. If you choose to complete this item, create a separate component called `WeatherView`. This component should take in all the props required to display the weather -- icon, description, temperature -- with their appropriate types, and render the weather based on its props.

#### Option #2
Implement the ["5 day weather forecast"](https://openweathermap.org/forecast5) API following the pattern used for the "current weather" API, and display the forecast in the `App` component below the current weather. You'll notice that the data for this API under the `list` item is very similar to the "current weather data" Use this to your advantage when implementing the API and displaying its values in the app.

#### Option #3
Add more data from the "current weather" API to the app. If you choose to complete this item, you'll need to do a few things:

1. Display the cloud coverage in %
2. Display the wind speed in km/h. Note that the API returns the wind speed in meters/second so you'll have to do the conversion!
3. Display the sunrise and sunset times in 24-hour format using the [`date-fns`](https://date-fns.org/) library we saw in class.

To do this, you'll first need to return more data from the `getCurrentWeatherByCity` function, alter the `CurrentWeather` interface to represent the returned data, and then modify the `App` component to display the additional data.

## Submit your project!
To submit your project for grading, zip the contents of the `src` directory and submit it to the McGill LMS.