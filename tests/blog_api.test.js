const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()
})

test('blogs are returned as json', async () =>{
    await api  
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(4)
});


test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Jest blog post",
        author: "Jest",
        url: "jest.com",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

const blogsAtEnd = await helper.blogsInDb()
expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

const title = blogsAtEnd.map(resp => resp.title)
expect(title).toContain(
    'Jest blog post'
)
const author = blogsAtEnd.map(resp => resp.author)
expect(author).toContain("Jest")
})

test('Post without title or url returns 400 Bad Request', async () =>{
     const newBlog = {
         author: "Jest",
         url: "jest.com",
         likes: 0
     }

     const response = await api
         .post('/api/blogs')
         .send(newBlog)
         .expect(400)
    
})

test('Unique ID is in a key called id', async () => {
    const response = await api.get('/api/blogs')
    
response.body.map(blog => 
        expect(blog.id).toBeDefined())
    
})

test('Likes are always set to zero if undefined', async () => {
      const newBlog = {
          title: "Post with likes undefined",
          author: "Jest",
          url: "jest.com",
      }

     const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)


    expect(response.body.likes).toBeDefined()
})



afterAll(() => {
    mongoose.connection.close()
})