import { useState } from "react"
import Statistics from "./components/Statistics"
import StatisticLine from "./components/StatisticLine"


const App = () => {

  //todo => 1.8 unicafe, paso 3

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [stats, setStats] = useState({
    all: 0,
    points: 0,
    positive: 0,
    average: 0
  });


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes , setVotes] = useState([0,0,0,0,0,0,0,0]);
  const [maxVotes, setMaxVotes] = useState(null)

  const handleRandomInt = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }


  const handleVote = (vote) => {
    const copy = [... votes ]

    copy[vote] += 1;
    setVotes(copy)
    setMaxVotes(copy.indexOf(Math.max(...copy)) )

  }


  const handleClick = (event) => {

    let updatedPoints = stats.points;
    let updateAverage = stats.average;
    let updatePositive = stats.positive;

    if(event === "good" ) {
      setGood( prevState => (prevState + 1) )
      updatedPoints = updatedPoints + 1
    }

    if(event === "neutral"  ) {
      setNeutral( prevState => (prevState + 1) )
    }

    if(event === "bad"){
      setBad(prevState => (prevState + 1))
      updatedPoints = updatedPoints - 1
    }

    let total = good + neutral + bad + 1
    updateAverage = updatedPoints / total
    updatePositive = ((good + 1) * 100) / total;



    setStats( { all: total , points: updatedPoints , average : updateAverage , positive:updatePositive } )

  }

  return (
    <div>
      <h1>Give Feedback</h1>

      <div>
        <button onClick={ () => handleClick("good") }>Good</button>
        <button onClick={ () => handleClick("neutral") }>Neutral</button>
        <button onClick={ () => handleClick("bad") }>Bad</button>
      </div>


      <div>
        <h2>Statiscs</h2>

        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>

        {
          stats.all > 0 ? <Statistics stats={stats}/>
          : <p>No feedback given</p>
        }

      </div>


      <div>
        <h2>Random anecdotes</h2>

        <p>{anecdotes[selected]}</p>
        <p>Votes: {votes[selected]}</p>

        <button onClick={() => setSelected(handleRandomInt)}>Next anecdote</button>
        <button onClick={() => handleVote(selected)}>Vote</button>
      </div>


      <div>
        <h2>Most voted anecdotes</h2>

        {
          !maxVotes ? "" 
          
          : <p>{anecdotes[maxVotes]} has {votes[maxVotes]} votes</p>
        }
        
      </div>
    </div>
  )
}

export default App