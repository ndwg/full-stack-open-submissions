import { useDispatch, useSelector } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)

  let style

  notification
  ?style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  :style = {
    display: 'none'
  }

  if(notification){
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification