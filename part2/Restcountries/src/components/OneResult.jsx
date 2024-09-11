import React, { useEffect, useState } from 'react'

const OneResult = ({country}) => {

    const [currentWeather, setCurrentWeather] = useState(null);

    const apiKey = import.meta.env.VITE_API_KEY;
    
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${country.capital}&appid=${apiKey}`)
          .then( (res) => {
            return res.json();
          })
          .then( (data) => {
            setCurrentWeather(data)
          } )
      }, [country])


    const lenguajes = Object.values(country.languages)
    

    return (
        <div className="result-container">
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital[0]} 🗺️</p>
            
                <p >Languages: </p>
                <ul>
                    {
                        lenguajes.map( (lenguaje , idx) => (
                            <li key={idx}>{lenguaje}</li>
                        ) )
                    }

                </ul>

                <img src={country.flags.png} alt={country.name.common} />

                {
                    currentWeather && 
                    <div>
                        <h3>Weather in {country.name.common}</h3>
                        <div className='weather-display'>
                            <p>{currentWeather.weather[0].main} </p>
                            <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`} alt={currentWeather.weather[0].main}  />

                        </div>
                        <p>Temperature {currentWeather.main.temp} C°  🌡️</p>
                        <p>Wind {currentWeather.wind.speed} m/s  🌫️</p>

                    </div>
                }

            
        </div>
    )
}

export default OneResult