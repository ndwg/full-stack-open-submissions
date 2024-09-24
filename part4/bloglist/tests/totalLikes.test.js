const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ];
    const listWithManyBlogs = [
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
    ];
    const listWithNoBlogs = [];
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has only many blogs, equals the likes of all blogs', () => {
      const result = listHelper.totalLikes(listWithManyBlogs)
      assert.strictEqual(result, 193)
    })

    test('when list has no blogs, equals zero', () => {
      const result = listHelper.totalLikes(listWithNoBlogs)
      assert.strictEqual(result, 0)
    })
  })