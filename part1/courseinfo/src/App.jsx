const Header = (props) =>{
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) =>{
  return (
    <p>
      {props.section}: {props.exerciseCount} exercises
    </p>
  )
}

const Total = (props) => {
  return(
    <p>
      Total number of exercises: {props.total}
    </p>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part section={props.part1} exerciseCount={props.exercises1}/>
      <Part section={props.part2} exerciseCount={props.exercises2}/>
      <Part section={props.part3} exerciseCount={props.exercises3}/>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App