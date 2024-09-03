const Notification = ({successMsg , errorMsg}) => {

  return (
    <div className={`msg ${successMsg ? "success" : "error"}`}>
      
        <p>{successMsg ? successMsg : errorMsg}</p>
    </div>
  )
}

export default Notification