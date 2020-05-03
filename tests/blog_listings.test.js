const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})


describe('total likes', () => {
    const listWithOneBlog = [{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]

    const listWithMoreThanOneBlog = [
        {
            _id: "5e9c669075bd6762a033a2c8",
            title: "My first blog post",
            author: "Miika",
            url: "mkallasoja.net",
            likes: 3,
            __v: 0
        }, {
            _id: "5e9c669b75bd6762a033a2c9",
            title: "My second blog post",
            author: "Miika",
            url: "mkallasoja.net",
            likes: 5,
            __v: 0
        }, {
            _id: "5e9c80e2da611057a8533518",
            title: "My third blog post",
            author: "Miika",
            url: "mkallasoja.net",
            likes: 10,
            __v: 0
        }, {
            _id: "5e9c8479e29c7161543a2d3a",
            title: "My fourth blog post",
            author: "Miika",
            url: "mkallasoja.net",
            likes: 12,
            __v: 0
        }


    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has several blogs, sums up likes of all blogs', () => {
        const result = listHelper.totalLikes(listWithMoreThanOneBlog)
        expect(result).toBe(30)
    })
})

describe('Favorite blog', () => {
  const blogs = [{
          _id: "5e9c669075bd6762a033a2c8",
          title: "My first blog post",
          author: "Miika",
          url: "mkallasoja.net",
          likes: 3,
          __v: 0
      },
      {
          _id: "5e9c669b75bd6762a033a2c9",
          title: "My second blog post",
          author: "Pauline",
          url: "mkallasoja.net",
          likes: 5,
          __v: 0
      }, {
          _id: "5e9c80e2da611057a8533518",
          title: "My third blog post",
          author: "Miika",
          url: "mkallasoja.net",
          likes: 10,
          __v: 0
      }, {
          _id: "5e9c8479e29c7161543a2d3a",
          title: "My fourth blog post",
          author: "Miika",
          url: "mkallasoja.net",
          likes: 12,
          __v: 0
      }]

    test('Find the blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: "My fourth blog post",
            author: "Miika",
            likes: 12
        })
    })

    test('Find the author with the most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(
            {
                author: 'Miika',
                blogs: 3
            }
        )
    })

    test('Find the author with the most likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(
            {
                author: 'Miika',
                likes: 25
            }
        )
    });
})