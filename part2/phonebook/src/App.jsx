import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

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
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

    const personIndex = persons.findIndex((n) => n.name == newName)

    if(personIndex >= 0){
      const oldPerson = persons[personIndex];
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(oldPerson.id, {...oldPerson, number: newPhone})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== oldPerson.id? person: returnedPerson))
            setErrorMessage(`Updated ${newName}'s number`)
            setNewName('')
            setNewPhone('')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return
    }

    const nameObject = {
      name: newName,
      number: newPhone
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(`Added ${newName}`)
        setNewName('')
        setNewPhone('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteNumber = (person) => {
    if(confirm(`Delete ${person.name}?`)){
      personService.destroy(person.id)
      setPersons(persons.filter((p) => p.id!=person.id))
    }
  }

  const personsFinal = newFilter.length === 0?
    persons
    : persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={newFilter} filterFunction={handleSetFilter}/>
      <h3>add a new</h3>
      <Form addFunction={addNumber} newName={newName} handleSetName={handleSetName} newPhone={newPhone} handleSetNumber={handleSetNumber}/>
      <h3>Numbers</h3>
      {personsFinal.map(person => 
        <div>
          <span key={person.name}>{person.name} {person.number}</span>
          <button 
            key={`${person.name}num`}
            onClick={() => deleteNumber(person)}>
              Delete
          </button>
        </div>
        )}
    </div>
  )
}

export default App