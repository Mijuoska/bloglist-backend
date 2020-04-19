const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
require('dotenv').config()


mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/blogs', blogRouter)
app.use(middleware.morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})

module.exports = app