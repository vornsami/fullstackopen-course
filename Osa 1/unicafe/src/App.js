import { useState } from 'react'

/// BUTTONS
const Button = (props) => {
  return (<button onClick={props.onClick}>{props.text}</button>)
}

const ButtonField = (props) => {
  const addGood = () =>{
    props.setGood(props.good+1)
  }
  const addNeutral = () =>{
    props.setNeutral(props.neutral+1)
  }
  const addBad = () =>{
    props.setBad(props.bad+1)
  }
  return (<div>
    <Button text="good" onClick={addGood}/>
    <Button text="neutral" onClick={addNeutral}/>
    <Button text="bad" onClick={addBad}/>
  </div>)
}

const Feedback = (props) => {
  return (<div>
    <h1>give feedback</h1>
    <ButtonField {...props}/>
  </div>)
}

/// STATISTICS

const StatisticLine = (props) => {
  return (<tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>)
}

const StatList = (props) => {
  const sum = props.good + props.neutral + props.bad
  const avg = (props.good - props.bad)/sum
  const pos = (props.good/sum)
  const pospercent = `${pos} %`

  if(sum <= 0) {
    return (<p>No feedback given</p>)
  }

  return (<div>
    <StatisticLine text="good" value ={props.good}/>
    <StatisticLine text="neutral" value ={props.neutral}/>
    <StatisticLine text="bad" value ={props.bad}/>
    <StatisticLine text="all" value ={sum}/>
    <StatisticLine text="average" value ={avg}/>
    <StatisticLine text="positive" value ={pospercent}/>
  </div>)
}

const Statistics = (props) => {
  return (<div>
    <h1>statistics</h1>
    <StatList {...props}/>
  </div>)
}

/// APP

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App