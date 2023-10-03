import Course from './Course'

const CourseList = (props) => {
  const courses = props.courses

  return (<div>
    {courses !== undefined && courses.map((course) => {
      return (<Course key={course.id} course={course}/>)
    })}
  </div>)
}

const App = () => {
  const courses = [
      {
      name:'Half Stack application development',
      id: 1,
      parts: [
        {name:'Fundamentals of React',      exercises: 10,    id: 1},
        {name:'Using props to pass data',   exercises: 7,     id: 2},
        {name:'State of a component',       exercises: 14,    id: 3}
      ]
    },
    {
      name:'Node.js',
      id: 2,
      parts: [
        {name:'Routing',                    exercises: 3,     id: 1},
        {name:'Middlewares',                exercises: 7,     id: 2},
      ]
    }
  ]

  return (
    <div>
      <CourseList courses={courses}/>
    </div>
  )
}

export default App