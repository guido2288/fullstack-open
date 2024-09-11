import { useEffect, useState } from "react"
import countriesServices from "./services/countriesServices";
import Filter from "./components/Filter";


function App() {



  const [allCountries, setallCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState([]);
  
  useEffect(() => {
    countriesServices
      .getAllCountries()
      .then( intialCountries => {
        setallCountries(intialCountries)
      } )


  }, [])
  
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value)
    let filterCountries = allCountries.filter( country => 
      country.name.common.toUpperCase().startsWith(event.target.value.toUpperCase()))
      setFilter(filterCountries)
     
  };


  return (
    <main>
      <h1>Find Countries</h1>
      <form action="">
        <input type="text" placeholder="Write a country..." value={searchValue} onChange={handleSearch}/>
      </form>
      <div>
        {
          filter.length <= 0 ?
          ""
          : <Filter filter={filter} /> 
        }
      </div>

      
    </main>
  )
}

export default App
