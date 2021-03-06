const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// Get all blogs route
blogRouter.get('/', async (request, response, next) => {
    try {
    const foundBlogs = await Blog.find({})
    .populate('user', 'username name')
    .populate('comments', 'content')
    return response.json(foundBlogs.map(blog => blog.toJSON()))
    } catch (exception) {
        next(exception) 
    }
})



// Create route
blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid '})
    }


    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        user: user._id,
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
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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
    const updatedBlog = 
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
         .populate('user', 'username name')
         .populate('comments', 'content')
    response.status(200).json(updatedBlog.toJSON())
    } catch(exception) {
        next(exception)
    }

})

blogRouter.delete('/:id', async (request, response, next)  => {
    const foundBlog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || decodedToken.id.toString() != foundBlog.user.toString()) {
        return response.status(401).json({
            error: 'Operation not authorized: wrong or missing token.'
        })
    } else {
    const deletedBlog = await Blog.findByIdAndRemove(foundBlog._id)
    return response.status(204).send("Blog with id " + request.params.id + " deleted.")
    }
});

blogRouter.post('/:id/comments', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    const comment = new Comment(
        {
          content: request.body.content,
          blog: request.params.id
        }
    )
    try {
        const savedComment = await comment.save()
        blog.comments = [...blog.comments, savedComment._id]
        await blog.save()
        response.status(201).json(savedComment.toJSON())
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogRouter
