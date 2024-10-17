import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
    username: "nate",
    name: "nate",
    id: "66f6c05a13f43a71193386e2"
}

const blog = {
    title: 'Mets bringing back pennant-winning stars to throw out ceremonial NLCS first pitches',
    author: 'R.J. Anderson',
    url: 'https://www.cbssports.com/mlb/news/mets-bringing-back-pennant-winning-stars-to-throw-out-ceremonial-nlcs-first-pitches/',
    likes: 34,
    user: user
}

describe('', () => {
    let container
    let mockHandler

    beforeEach( () => {
        mockHandler = jest.fn()
        container = render(<Blog blog={blog} user={user} updateLikes={mockHandler} />).container
    })

    test('renders title and author, but not URL or likes', () => {
        const titleAndAuthor = container.querySelector('.blogListing')
        const url = container.querySelector('#blogurl')
        const likes = container.querySelector('#blogLikes')
    
        expect(titleAndAuthor).toBeVisible()
        expect(url).not.toBeVisible()
        expect(likes).not.toBeVisible()
    })

    test('renders URL and likes after details button is clicked', async () => {
        const user = userEvent.setup()
        const button = container.querySelector('#viewButton')
        await user.click(button)
    
        const url = container.querySelector('#blogurl')
        const likes = container.querySelector('#blogLikes')
    
        expect(url).toBeVisible()
        expect(likes).toBeVisible()
    })

    test('clicking the like button twice, calls event handler twice', async () => {
        const user = userEvent.setup()
        const button = container.querySelector('#viewButton')
        await user.click(button)

        const lbutton = container.querySelector('#likeButton')
        await user.click(lbutton)
        await user.click(lbutton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})