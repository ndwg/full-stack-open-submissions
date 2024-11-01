import { useSelector } from 'react-redux'

const Notification = () => {

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

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification