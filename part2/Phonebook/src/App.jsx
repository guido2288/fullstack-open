import randomId from "random-id";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personsServices from "./services/personsServices";

import { useEffect, useState } from "react"
import Notification from "./components/Notification";


function App() {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState("");
  const [successMsg, setSuccessMsg ] = useState(false);
  const [errorMsg, setErrorMsg ] = useState(false);

  const [filterPersons, setFilterPersons] = useState(null);

  //TODO -> 2.16  npm run server!!

  useEffect(() => {
    personsServices
      .getAll()
      .then( initialPersons => {
        setPersons(initialPersons)
      } )
  }, [])
  

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmitName = (event) => {
    event.preventDefault();

    if(!newName || !newNumber ) return alert("Missing fields");

    

    let userSearch = persons.find( person => person.name === newName );

    
    if(userSearch) {
      if(window.confirm(`${newName} is already to phonebook, replace the old number with a new one?`)){
        let changedNumber = {...userSearch, number: newNumber}
       
        personsServices
          .update(userSearch.id, changedNumber)
            .then(returnedPersons => {
              setPersons( persons.map( person => person.id !== changedNumber.id ? person : changedNumber ) )
            })
            .catch(error => {
              setErrorMsg(`Information of ${changedNumber.name} has already been removed from server`)
              console.log(errorMsg)
              setTimeout( () => {
                setErrorMsg(false)
              }, 2500 )
            })
            return
      }
      return 
    }

    const updatedPersons =  { name: newName , number: newNumber , id: randomId(10)};

    personsServices
      .create(updatedPersons)
        .then( returnedPerson => {
          setPersons( persons.concat(returnedPerson))
          setNewName("");
          setNewNumber("");
        } )

    setSuccessMsg(
      `${updatedPersons.name} Successfully added!`
    )

    setTimeout( () => {
      setSuccessMsg(false)
    }, 2500 )

  }

  const handleFilterName = (event) => {
    setFilter(event.target.value)
    let filterPerson = persons.filter( person => 
        person.name.startsWith(event.target.value.toUpperCase()));
    setFilterPersons(filterPerson)
  }

  const handleDeletePerson = (id) => {

    let personToDelete = persons.filter( person => person.id === id );
    console.log(personToDelete)
    if(window.confirm(`Delete ${personToDelete[0].name}`)){
      let updatedPersons = persons.filter( person => person.id !== id )

      personsServices
        .deletePerson(id)
  
      setPersons(updatedPersons)
    }

    
  }

  return (
    <div className="main-container">

      {
        successMsg && <Notification successMsg={successMsg} />
      }

      {
        errorMsg && <Notification errorMsg={errorMsg} />
      }
      
      
      <h2>Numberbook</h2>

      <Filter filter={filter} handleFilterName={handleFilterName}/>

      <PersonForm 
        newName={newName} 
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
        handleSubmitName={handleSubmitName}
        />

      <h2>My Contacts</h2>
      <div className="contacts-container">
        {
          !filterPersons 
            ? <Persons persons={persons} handleDeletePerson={handleDeletePerson}/>
            : <Persons persons={filterPersons} handleDeletePerson={handleDeletePerson}/>
        }

      </div>


      


    </div>
  )
}

export default App
