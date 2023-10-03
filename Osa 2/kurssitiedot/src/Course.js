const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return(<p>
    {props.part.name} {props.part.exercises}
  </p>)
}

const Content = (props) => {
  const parts = props.parts
  return (
  <div>
    {parts !== undefined && parts.map((part) => {
      return(<Part key={part.id} part={part}/>)
    })}
  </div>)
}

const Total = (props) => {
  const total = props.parts.reduce((total, part) => total = total + part.exercises, 0)
  return (
    <p><b>Number of exercises: {total}</b></p>
  )
}

const Course = (props) => {
  return (<div>
    <Header course={props.course.name}/>
    <Content parts={props.course.parts}/>
    <Total parts={props.course.parts}/>
  </div>)
}


export default Course