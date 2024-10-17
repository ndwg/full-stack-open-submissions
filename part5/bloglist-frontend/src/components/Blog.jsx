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
  <div style={blogStyle} className='blogListing'>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author}
      <button id='viewButton' onClick={toggleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title} {blog.author}
      <button id='hideButton' onClick={toggleVisibility}>hide</button>
      <div id='blogurl'>{blog.url}</div>
      <div id='blogLikes'>{blog.likes}<button id='likeButton' onClick={updateLikes}>like</button></div>
      <div>{blog.user.username}</div>
      <button style={removeStyle} onClick={removeBlog}>remove</button>
    </div>  
  </div>
  )
}

export default Blog