const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response, next) => {
     const blog = new Blog(request.body)
    console.log(request.body)
    response.send(request.body)
    blog
    .save()
    .then(result => {
    response.status(201).json(result.toJSON())
    }).catch(error => next(error))
}

)

module.exports = blogRouter
