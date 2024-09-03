import Content from "./Content"
import Header from "./Header"

const Course = ({course}) => {

  const totalExercises = course.parts.reduce( (sum , part) => sum + part.exercises , 0 )

  return (
    <div>
        <Header name={course.name}/>
        {
            course.parts.map(part=> (
                <Content 
                    key={part.id}
                    name={part.name}
                    exercises={part.exercises}
                />
            ))
        }
    
        <b>Total of {totalExercises} exercises</b>
    </div>
  )
}

export default Course