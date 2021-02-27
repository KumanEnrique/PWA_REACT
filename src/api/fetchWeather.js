import axios from 'axios'

const URL = "https://api.openweathermap.org/data/2.5/weather"
//const API_KEY = "40eb1ba27c4a8261b82f6c56048d0820"
const API_KEY = "f33a484cf794d08d0148764789aaba32"

export const fetchWeather = async (query) =>{
    const {data} = await axios.get(URL,{
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    })
    return data
}