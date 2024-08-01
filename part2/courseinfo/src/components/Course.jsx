const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => <b>total of {parts.reduce((s,p)=>s+p.exercises,0,)} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part}/>
    )}
  </>

const Course = ({courses}) => {
  return(
  <div>
    {courses.map(course =>
      <div>
        <Header key={course.id+'h'} course={course.name}/>
        <Content key={course.id+'c'} parts={course.parts}/>
        <Total key={course.id+'t'} parts={course.parts}/>
      </div>
    )}
  </div>
  )
}

export default Course