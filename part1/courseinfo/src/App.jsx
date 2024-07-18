const Header = (props) =>{
  return (
    <h1>
      {props.course.name}
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
      Total number of exercises: {props.course.parts[0].exercises+props.course.parts[1].exercises+props.course.parts[2].exercises}
    </p>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part section={props.course.parts[0].name} exerciseCount={props.course.parts[0].exercises}/>
      <Part section={props.course.parts[1].name} exerciseCount={props.course.parts[1].exercises}/>
      <Part section={props.course.parts[2].name} exerciseCount={props.course.parts[2].exercises}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App