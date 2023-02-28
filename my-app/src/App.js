import { useState } from 'react';

const emptyResponse = {
  location: {
    country: "",
    region: "",
    lat: "",
    lon: "",
  },
  current: {
    temp_f:  "",
    temp_c: "",
    wind_mph:"",
    feelslike_f:"",
    feelslike_c:"",
    precip_in:"",
    humidity:""
  },
}
function CityButton({value, onCityClick}) {
  return <button onClick={onCityClick}>{value}</button>;
}

async function fetchWeather(city) {
  const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + city;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3452a120damshbc0393d0eaebb81p1313cejsn81258cb73066',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options)
    if(response.ok){
      const json = await response.json()
      return json
    } else {
      const json = emptyResponse
      json.title = "Error: Please enter a valid City."
      console.log(json.title)
      return json
    }
  } catch (err) {
    const json = emptyResponse
    json.title = "Error: Please enter a valid City."
    console.log(json.title)
    return json
  }
}

export default function Weather() {
  const [initialRender, setInitialRender] = useState(true)
  const [input, setInput] = useState("")
  const [curWeather, setCurWeather] = useState(emptyResponse)

  function handleClick(city){
    fetchWeather(city).then(json => {
      console.log(json)
      if(!("title" in json && json.title.includes("Error") )) {
        json.title = "Current Weather in " + json.location.name;
      }
      setCurWeather(json)
      console.log(curWeather)
      console.log("country"  + curWeather.location)
      return json;
    }); 
}

  if(initialRender){
    setInitialRender(false)
    console.log("init")
    handleClick("Austin")
  }
  
  return (
    <>
      <h1>Today's Weather</h1>
      <div className="row">
          <CityButton value={"Austin"} onCityClick={() => handleClick("Austin")} />
          <CityButton value={"Dallas"} onCityClick={() => handleClick("Dallas")} />
          <CityButton value={"Houston"} onCityClick={() => handleClick("Houston")} /> 
      </div>
      <div className="row">
        <input 
          type="text" 
          name="City" 
          placeholder='Search for City Name'
          onChange={(a) => {
            setInput(a.target.value);
          }}/>
        <CityButton value={"Search"} onCityClick={() => handleClick(input)} />
      </div>

      <h2>{curWeather.title}</h2>
      <h3><u>Location</u></h3>
      <p><b>Region:</b> {curWeather.location.region}</p>
      <p><b>Country:</b> {curWeather.location.country}</p>
      <p><b>Latitude:</b> {curWeather.location.lat}</p>
      <p><b>Longitude:</b> {curWeather.location.lon}</p>
      <h3><u>Current Conditions</u></h3>
      <p><b>Temperature</b> {curWeather.current.temp_f}ºf</p>
      <p><b>Temperature in Celcius:</b> {curWeather.current.temp_c}ºc</p>
      <p><b>Wind Speed</b> {curWeather.current.wind_mph}mph</p>
      <p><b>Windchill:</b> {curWeather.current.feelslike_f}ºf</p>
      <p><b>Windchill:</b> {curWeather.current.feelslike_c}ºc</p>
      <p><b>Precipitation:</b> {curWeather.current.precip_in}in</p>
      <p><b>Humidity:</b> {curWeather.current.humidity}%</p>
    </>
  );
}