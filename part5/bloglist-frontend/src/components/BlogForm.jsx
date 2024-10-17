import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: newTitle,
        author: newAuthor,
        url: newURL,
        likes: 0,
        user: user._id
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
      <div>
        title: 
        <input
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          placeholder='title'
        />
      </div>
      <div>
        author: 
        <input
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
          placeholder='author'
        />
      </div>
      <div>
        url: 
        <input
          value={newURL}
          onChange={event => setNewURL(event.target.value)}
          placeholder='url'
        />
      </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm