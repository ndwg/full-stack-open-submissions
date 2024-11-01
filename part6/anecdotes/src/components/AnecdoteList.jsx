import { useDispatch, useSelector } from 'react-redux'
import { sendVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


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
              <button onClick={() => dispatch(sendVote(anecdote.id)) 
                & dispatch(setNotification(`you voted "${anecdote.content}"`,1))}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

export default AnecdoteList