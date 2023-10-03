import { useState, useEffect } from 'react'
import data from './services/database'
import './index.css'
import weathericons from './weathericons.json' // icons by icons.qweather.com/

const CapitalData = (props) => {
  if (props.capitals.length === 1) return <tr><td><b>Capital:</b> {props.capitals[0]}</td></tr>
  // In case there are multiple capitals
  return (<tr>
      <td><b>Capitals:</b> {props.capitals.map((capital) => {return capital + ', '})}</td>
    </tr>)
}

const LanguageData = (props) => {
  const languages = Object.keys(props.languages).map((key,i) => {
    return props.languages[key]
  })

  if (languages.length === 1) return <tr><td><b>Language:</b> {languages[0]}</td></tr>
  // In case there are multiple languages
  return (<tr>
      <td><b>Languages:</b> { 
        <ul>
          {languages.map((language) => {return (<li key={language}>{language}</li>)})}
        </ul>
      }</td>
    </tr>)
}

const CountryData = (props) => {
  return (<div>
    <table><tbody>
      <tr key={'flag'}><td><img src={props.country.flags.png} alt={props.country.flag.alt}/></td></tr>
      <CapitalData capitals = {props.country.capital} key={'capital'}/>
      <tr key={'area'}><td><b>Area:</b> {props.country.area} sqkm</td></tr>
      <LanguageData languages={props.country.languages} key={'language'}/>
    </tbody></table>
  </div>)

}

const WeatherIcon = (props) => {
  const code = props.weatherCode
  if (!weathericons[code]) return null

  return <img style={{ height: 50, width: 50 }} src={weathericons[code].img} alt={weathericons[code].alt}/>

}

const WeatherData = (props) => {
  const [weatherdata, setWeatherdata] = useState({})
  const latitude = props.position[0]
  const longitude = props.position[1]

  useEffect(() => {
    data.getWeather(latitude,longitude,setWeatherdata)
  }, [])

  const currentWeather = weatherdata.current_weather
  
  return <dl>{ currentWeather && (<div>
    <dt><WeatherIcon weatherCode={currentWeather.weathercode}/></dt>
    <dt>temperature {currentWeather.temperature}</dt>
    <dt>wind {currentWeather.windspeed} m/s</dt></div>)
  }</dl>
}

const CountryInfo = (props) => {
  console.log (props.country)

  return (<div>
    <h2>{props.country.name.common}</h2>
    <CountryData country={props.country}/>
    <h3>Weather in {props.country.capital[0]}</h3>
    <WeatherData position={props.country.capitalInfo.latlng}/>
  </div>)
}

const CountryListElement = (props) => {
  const country = props.country
  return (<tr>
      <td>{country.name.common}</td>
      <td><button onClick={() => props.handleShow(country.name.common)}>show</button></td>
    </tr>)
}

const CountryList = (props) => {
  const filter = props.filter.toLowerCase()
  const countries = (!filter || filter === '') ? props.countries : props.countries.filter(country => country.name.common.toLowerCase().includes(filter))

  const handleShow = (countryName) => {
    props.setFilter(countryName)
  }

  // This is a bit messy, but basically returns a simple list if there are more than 10 results or data page if there is one result
  if (countries.length > 10) {
    return <b>Too many matches</b>
  } else if (countries.length > 1) {
    return (<div>
      <table><tbody>
        {countries !== undefined && countries.map((country) => {
          return (<CountryListElement handleShow= {handleShow} country={country} key={country.name.common}/>)
        })}
      </tbody></table>
    </div>)
  } else if (countries.length === 0) {
    return <b>No matches</b>
  }

  return (<CountryInfo country= {countries[0]}/>)
}

const Filter = (props) => {
  return <div>filter countries: <input value = {props.value} onChange= {props.handler}/></div>
}


const App = () => {
  // Hooks
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    data.getCountryList(setCountries)
      .catch(error => {
        alert('Failed to fetch data from the server')
      })
  }, [])

  // Handlers
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
 
  // The page (Extra header in case needed)
  return (
    <div>
      <h2>Country Information</h2>
      <Filter value={filter} handler={handleFilterChange}/>
      <h2></h2>
      <CountryList countries = {countries} filter = {filter} setFilter = {setFilter}/>
    </div>
  )

}

export default App