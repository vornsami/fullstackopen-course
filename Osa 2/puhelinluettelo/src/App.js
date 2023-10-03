import { useState, useEffect } from 'react'
import database from './services/database'
import './index.css'

const NumberInfo = (props) => {
  const person = props.person

  // Handler for deleting the number
  const deleteHandler = async (event) => {
    event.preventDefault()
    if (window.confirm('Really delete this number?')) {
      try {
        const id = await props.delete(person.name)
        database.deletePerson(id).catch(error => {

        })
      } catch (e) {
        alert(e)
      }
    }
  }
  return <tr>
      <td><b>{person.name}</b></td>
      <td>&emsp;{person.number}</td>
      <td><button onClick={deleteHandler}>delete</button></td>
    </tr>
}

const NumberList = (props) => {
  const persons = (!props.filter || props.filter === '') ? props.persons : props.persons.filter(person => person.name.includes(props.filter))
  return (<div>
    <table><tbody>
      {persons !== undefined && persons.map((person) => {
        return (<NumberInfo person={person} key={person.name} delete={props.delete}/>)
      })}
    </tbody></table>
  </div>)
}

const Filter = (props) => {
  return <div>filter users: <input value = {props.value} onChange= {props.handler}/></div>
}

const NumberForm = (props) => {
  return <form>
    <div>
      name: <input value = {props.nameValue} onChange= {props.nameHandler}/>
    </div>
    <div>
      number: <input value = {props.numberValue} onChange= {props.numberHandler}/>
    </div>
    <div>
      <button onClick={props.submitHandler}>add</button>
    </div>
  </form>
}

const Notification = (props) => {
  if (!props.text) {
    return null
  }
  return <div className={(props.type)? props.type : 'note' }>
      {props.text}
    </div>

}


const App = () => {
  // Hooks
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({})

  // For simplifying notifications with timeouts

  const setTimeoutNotification = async (note) => {
    setNotification(note)
    setTimeout(() => {
      setNotification({})
    }, 3000)
  }

  // Fetches stored person data
  useEffect(() => {
    database.getPersonList(setPersons)
      .catch(error => {
        setNotification({text:'Failed to fetch data from the server', type:'error'})
      })
  }, [])
  
  // Hook Handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const newEntry = { name: newName, number: newNumber }

    const existingPerson = persons.find(person => person.name === newEntry.name)
    const callback = () => {
      database.getPersonList(setPersons)
        .catch(error => {
          setNotification({text:'Failed to fetch data from the server', type:'error'})
        })
      setNewName('')
      setNewNumber('')
    }

    // Checks for duplicate names
    if (existingPerson) {
      if (window.confirm(`${newEntry.name} already been added to the phonebook, do you wish to update it?`)) {
        const updatedPerson = {...existingPerson, number: newNumber }
        database.updatePerson(updatedPerson)
          .then(callback)
          .then(setTimeoutNotification({text: 'Number updated'}))
          .catch(error => {
            setTimeoutNotification({text: 'Update failed, data may no longer exist', type: 'error'})
          })
      }

      return
    }

    try {
      database.addPerson(newEntry)
        .then(callback)
        .then(setTimeoutNotification({text: 'Number added successfully'}))
        .catch(error => {
          setTimeoutNotification({text: 'Addition failed', type: 'error'})
        })
    } catch (e) {
      alert(`failed to add name to the phonebook`)
    }
  }

  // id getter for deleting a number + deletes from persons
  const deletePerson = async (name) => {
    const newPersons = persons.filter(person => person.name !== name)
    setPersons(newPersons)
    setTimeoutNotification({text: 'Number deleted'})

    const id = persons.find(person => person.name === name).id
    return id
  }
 

  // The page
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleFilterChange}/>
      <h2>Add a new number</h2>
      <NumberForm nameValue={newName} numberValue={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} submitHandler={handleSubmit}/>
      <h2>Numbers</h2>
      <Notification text={notification.text} type={notification.type}/>
      <NumberList persons = {persons} filter = {filter} delete= {deletePerson}/>
    </div>
  )

}

export default App