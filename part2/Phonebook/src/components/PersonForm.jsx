
const PersonForm = ({newName,handleChangeName,newNumber,handleChangeNumber,handleSubmitName}) => {
  return (
    <form>
        <div className="input-container">
          <label htmlFor="Name">Name: </label>
          <input type="text" value={newName} onChange={handleChangeName}/>
        </div>

        <div className="input-container">
          <label htmlFor="Number">Number: </label>
          <input type="text" value={newNumber} onChange={handleChangeNumber}/>

        </div>
   
     
        <div>

          <button className="submit-btn" type="submit" onClick={handleSubmitName}>Add contact</button>
        </div>

    </form>
  )
}

export default PersonForm