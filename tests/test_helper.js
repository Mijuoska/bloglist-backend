const Blog = require('../models/blog')

const initialBlogs = [{
        _id: "5e9c669075bd6762a033a2c8",
        title: "My first blog post",
        author: "Miika",
        url: "mkallasoja.net",
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
    }]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
