const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,

    // url: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__V
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
