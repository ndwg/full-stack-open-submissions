import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const StatisticLine = ({text, value, suffix}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value} {suffix}</td>
    </tr>
  )
}


const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Statistics = (props) => {
  if(props.all==0){
    return <div>No feedback given</div>
  }
  else{
  return(
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.all}/>
        <StatisticLine text='average' value={props.avg/props.all}/>
        <StatisticLine text='positive' value={(props.good/props.all)*100} suffix='%'/>
      </tbody>
    </table>
    
  )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)

  const setGoodValue = () => {
    setGood(good+1);
    setAll(all+1);
    setAvg(avg+1);
  }
  const setNeutralValue = () => {
    setNeutral(neutral+1);
    setAll(all+1);
  }
  const setBadValue = () => {
    setBad(bad+1);
    setAll(all+1);
    setAvg(avg-1);
  }

  return (
    <div>
      <Title text='give feedback'/>
      <Button text='good' handleClick={setGoodValue}/>
      <Button text='neutral' handleClick={setNeutralValue}/>
      <Button text='bad' handleClick={setBadValue}/>
      <Title text='statistics'/>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} avg={avg}/>
    </div>
  )
}

export default App