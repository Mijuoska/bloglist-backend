const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// Get all blogs route
blogRouter.get('/', async (request, response, next) => {
    const foundBlogs = await Blog.find({})
    response.json(foundBlogs)
})

// Create route
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

// Update route

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    
    const existingBlog = await Blog.findById(request.params.id)
     const existingLikes = Number(existingBlog.likes)
    const newLikes = existingLikes + Number(body.likes)

    const blog = {likes: newLikes}
    try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).send(updatedBlog)
    } catch(error) {
        next(error)
    }

})


blogRouter.delete('/:id', async (request, response, next)  => {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).send("Blog with id " + request.params.id + " deleted.")
});

module.exports = blogRouter
