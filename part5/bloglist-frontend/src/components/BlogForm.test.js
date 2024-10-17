import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const user = {
    username: "nate",
    name: "nate",
    id: "66f6c05a13f43a71193386e2"
}

test('form calls event handle and creates blog correctly on submit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm user={user} createBlog={createBlog} />)

    screen.debug()

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('save')

    await user.type(titleInput, 'Dodgers Are Grinding Mets Into Submission in NLCS')
    await user.type(authorInput, 'Tom Verducci')
    await user.type(urlInput, 'https://www.si.com/mlb/dodgers-lead-mets-nlcs-game-3-shohei-ohtani-walker-buehler-dave-roberts')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Dodgers Are Grinding Mets Into Submission in NLCS')
    expect(createBlog.mock.calls[0][0].author).toBe('Tom Verducci')
    expect(createBlog.mock.calls[0][0].url).toBe('https://www.si.com/mlb/dodgers-lead-mets-nlcs-game-3-shohei-ohtani-walker-buehler-dave-roberts')
})