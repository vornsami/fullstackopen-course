import { useState } from 'react'

const AnecdoteButtons = (props) => {
  return (<div>
    <button onClick={props.addvote}>vote</button>
    <button onClick={props.nextAnecdote}>next anecdote</button>
  </div>)
}

const AnecdoteInfo = (props) => {
  return (<div>
    {props.text}
    <br/>
    has {props.votes} votes
  </div>)
}

const DayAnecdote = (props) => {

  const nextAnecdote = () => {
    const nextSel = (props.selected >= props.anecdotes.length - 1)? 0 : props.selected + 1
    props.setSelected(nextSel)
  }

  const addvote = (select) => {
    const copy = [...props.anecdotes]
    copy[select].votes += 1
    props.setAnecdotes(copy)
  }

  return (<div>
    <h1>Anecdote of the day</h1>
    <AnecdoteInfo text={props.anecdotes[props.selected].text} votes={props.anecdotes[props.selected].votes}/>
    <AnecdoteButtons addvote={() => addvote(props.selected)} nextAnecdote={nextAnecdote}/>
  </div>)
}

const TopAnecdote = (props) => {
  const getIndexOfMost = () => {
    var max = props.anecdotes[0].votes;
    var maxIndex = 0;

    for (var i = 1; i < props.anecdotes.length; i++) {
        if (props.anecdotes[i].votes > max) {
            maxIndex = i;
            max = props.anecdotes[i].votes;
        }
    }

    return maxIndex;
  }
  const top = getIndexOfMost()

  return (<div>
    <h1>Anecdote with most votes</h1>
    <AnecdoteInfo text={props.anecdotes[top].text} votes={props.anecdotes[top].votes}/>
  </div>)
}

const App = () => {
  const initialAnecdotes = [
    {text: 'If it hurts, do it more often.', votes: 0},
    {text: 'Adding manpower to a late software project makes it later!', votes: 0},
    {text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {text: 'Premature optimization is the root of all evil.', votes: 0},
    {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.', votes: 0},
    {text: 'The only way to go fast, is to go well.', votes: 0}
  ]
   
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)

  

  return (
    <div>
      <DayAnecdote selected={selected} setSelected={setSelected} anecdotes={anecdotes} setAnecdotes={setAnecdotes}/>
      <TopAnecdote anecdotes={anecdotes}/>
    </div>
  )
}

export default App