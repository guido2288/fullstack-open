import { useEffect, useState } from "react"
import ManyResults from "./ManyResults"
import OneResult from "./OneResult"


const Filter = ({filter}) => {

  const [result, setResult] = useState(false);

  const handleShow = (country) => {
    setResult(country)
  }

  return (
    <>

        {
            filter.length > 10 
            ? <ManyResults />
            : filter.length == 1 ? <OneResult country={filter[0]}/>
            : filter.map( (country , idx) => (
                <div className="list-countries" key={idx}>
                    <p>{country.name.common}</p>
                    <button onClick={ () =>  handleShow(country)}>show</button>

                </div>
            ) )
        }

        {
            result && (filter.length !== 1 && filter.length < 10) && <OneResult country={result}/>
        }



    </>
  )
}

export default Filter