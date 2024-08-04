import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, filterFunction}) => {
  return(
  <div>
    filter shown with <input 
      value = {filter}
      onChange={filterFunction}
    />
  </div>
  )
}

const Name = ({name, nameFunction}) => {
  return(
    <div>
          name: <input 
          value = {name}
          onChange={nameFunction}
          />
    </div>
  )
}

const Number = ({phone, phoneFunction}) => {
  return(
    <div>
          number: <input 
          value = {phone}
          onChange={phoneFunction}
          />
    </div>
  )
}

const Form = ({addFunction, newName, handleSetName, newPhone, handleSetNumber}) => {
  return(
    <form onSubmit={addFunction}>
        <Name name={newName} nameFunction={handleSetName}/>
        <Number phone={newPhone} phoneFunction={handleSetNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSetName = (event) => {
    setNewName(event.target.value);
  }

  const handleSetNumber = (event) => {
    setNewPhone(event.target.value);
  }

  const handleSetFilter = (event) => {
    setNewFilter(event.target.value);
  }

  const addNumber = (event) => {
    event.preventDefault()

    if(persons.findIndex((n) => n.name == newName) >= 0){
      alert(`${newName} is already added to phonebook`)
      return
    } 

    const nameObject = {
      name: newName,
      number: newPhone
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewPhone('')
  }

  const personsFinal = newFilter.length === 0?
    persons
    : persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} filterFunction={handleSetFilter}/>
      <h3>add a new</h3>
      <Form addFunction={addNumber} newName={newName} handleSetName={handleSetName} newPhone={newPhone} handleSetNumber={handleSetNumber}/>
      <h3>Numbers</h3>
      {personsFinal.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
        )}
    </div>
  )
}

export default App