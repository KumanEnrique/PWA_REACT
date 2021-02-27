import React, {useState} from 'react'
import { fetchWeather } from "./api/fetchWeather";
import './App.css'

const App = () =>{
    const [query,setQuery] = useState("")
    const [weather,setWeather] = useState({})
    const search = async (e)=>{
        if(e.key === "Enter"){
            const data = await fetchWeather(query)
            setWeather(data)
            setQuery('')
            console.log(data)
        }
    }
    return(
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Search..."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                onKeyPress={search}
            />
            {weather.main &&(
                <div className="city">
                    <div className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </div>
                    <div className="city-child">
                        <h3>Temperatura</h3>
                        {weather.main.temp}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="city-child">
                        <h3>Viento</h3>
                        {weather.wind.speed}
                        <sup>M/S</sup>
                        {(weather.wind.speed*3600/1000).toFixed(3)}
                        <sup>KM/H</sup>
                    </div>
                    <div className="city-child">
                        <h3>Humedad</h3>
                        {weather.main.humidity}
                        <sup>%</sup>
                    </div>
                   <div className="info">
                        <img  alt={weather.weather[0].description} 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                        <p>{weather.weather[0].description}</p>
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default App