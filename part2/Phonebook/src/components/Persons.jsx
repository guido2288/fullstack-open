
const Persons = ({persons , handleDeletePerson}) => {
  return (
    <>
        {
          persons.map( (person) => (
            <div className="contact-info" key={person.id}>
              <p >{person.name} {person.number}</p>
              <button onClick={() => handleDeletePerson(person.id)}>❌</button>
            </div>
          ) )
        }
    </>
  )
}

export default Persons