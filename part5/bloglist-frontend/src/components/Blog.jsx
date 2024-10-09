import { useState} from 'react'

const Blog = ({ blog, updateLikes, user, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let removeStyle = {
    display: 'none'
  }

  if(blog.user.username===user.username){
    removeStyle ={
      display: ''
    }
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>hide</button>
      <div>{blog.url}</div>
      <div>{blog.likes}<button onClick={updateLikes}>like</button></div>
      <div>{blog.user.username}</div>
      <button style={removeStyle} onClick={removeBlog}>remove</button>
    </div>  
  </div>
  )
}

export default Blog