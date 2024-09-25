const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "How Hurricane Helene could impact Braves vs. Mets: What to know as potential storm heads toward Atlanta",
        "author": "Mike Axisa",
        "url": "https://www.cbssports.com/mlb/news/how-hurricane-helene-could-impact-braves-vs-mets-what-to-know-as-potential-storm-heads-toward-atlanta/",
        "likes": 24,
        "id": "66f2ff9aea97f8c53bad932c"
      },
      {
        "title": "Fortnite 'Bye Bye Bye' Emote Is Here, Featuring *NSYNC, Deadpool & Wolverine's Iconic Dance",
        "author": "Isaiah Richard",
        "url": "https://www.techtimes.com/articles/307616/20240924/fortnite-bye-bye-bye-emote-here-featuring-nsync-deadpool-wolverines-iconic-dance.htm",
        "likes": 78,
        "id": "66f2ffa6ea97f8c53bad932e"
      },
      {
        "title": "The Devils Will Go As Far as Nico Hischier and Jack Hughes Take Them",
        "author": "Chris Fieldhouse",
        "url": "https://www.allaboutthejersey.com/2024/9/23/24251199/the-devils-will-go-as-far-as-nico-hischier-and-jack-hughes-take-them-bratt-meier-keefe-mercer-haula",
        "likes": 91,
        "id": "66f2ffacea97f8c53bad9330"
      }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

   assert.strictEqual(response.body.length, initialBlogs.length)
})

test('verify id property name', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach(blog => {
        assert(blog.id);
    });
});

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "Sean ‘Diddy’ Combs Linked To Firebombed Car Possibly Belonging To Kid Cudi: A Complete Timeline Of Allegations Against Him",
        author: "Mary Whitfill Roeloffs",
        url: "https://www.forbes.com/sites/antoniopequenoiv/2024/09/24/sean-diddy-combs-and-bodyguard-accused-of-filming-drugged-womans-assault-a-complete-timeline-of-allegations-against-him/",
        likes: 68
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
  
    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await blogsInDb()
  
    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
})

test('a blog can be updated', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: 7
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(201)
  
    const blogsAtEnd = await blogsInDb()
  
    assert.strictEqual(blogsAtEnd[0].likes, 7)
})

after(async () => {
  await mongoose.connection.close()
})