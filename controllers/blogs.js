const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    const foundBlogs = await Blog.find({})
    response.json(foundBlogs)
})

blogRouter.post('/', async (request, response, next) => {
     

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    })

   if (!blog.title || !blog.url) {
       response.status(400).send('A post cannot have a missing title or url')
   }

    if (blog.likes == undefined) {
        blog.likes = 0
    }

    try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
   } catch(exception) {
       next(exception)
   }
})

module.exports = blogRouter
