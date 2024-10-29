import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
      console.log(state)
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
  
    return (
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(vote(anecdote.id)) 
                & dispatch(notificationChange(`you voted "${anecdote.content}"`))}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

export default AnecdoteList