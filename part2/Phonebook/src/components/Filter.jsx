
const Filter = ({filter , handleFilterName}) => {
  return (
    <div className="input-container">
        <label >Filter shown with: </label>
        <input type="text" value={filter} onChange={handleFilterName} />
    </div>
  )
}

export default Filter