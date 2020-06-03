const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()

    await api
        .post('/api/users')
        .expect(200)
        .send(helper.initialUsers[0])
})



describe('Format and number of blogs', async () => {

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

});

describe('Creating and updating blogs', async () => {

test('a valid blog can be added', async () => {
    const response = await api
        .post('/api/login')
        .send({username: 'testuser', password: '123abc'})
        .expect(200)

    const token = 'bearer ' + response.token

    const newBlog = {
        title: "Jest blog post",
        author: "Jest",
        url: "jest.com",
        likes: 0
    }

    await api
        .post('/api/blogs')
       .set('Authorization', token)
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

test('Blog likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1]
    
    const updatedBlog = { likes: 1 }

    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
    
    expect(response.body.likes).toBe(6)

})

});

describe('deletion of a blog', () => {
test('Succeeds with status code 204 if id is valid', async ()  => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    console.log("Blog id " + blogToDelete.id)

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(response => response.title)

    expect(title).not.toContain(blogToDelete.title)
});
});
afterAll(() => {
    mongoose.connection.close()
})