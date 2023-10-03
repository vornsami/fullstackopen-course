import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.open-meteo.com/v1/forecast'

const getCountryList = async (callback) => {
  await axios.get(baseUrl + '/all')
    .then(response => {
      console.log(response.data)
      if (callback) callback(response.data)
  })
}

const getCountryData = async (name, callback) => {
  await axios.get(baseUrl + '/name/' + name)
    .then(response => {
      if (callback) callback(response.data)
  })
}

const getWeather = async (latitude, longitude, callback) => {
  await axios.get(`${weatherUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
  .then(response => {
    if (callback) callback(response.data)
})
}


export default {getCountryList, getCountryData, getWeather}