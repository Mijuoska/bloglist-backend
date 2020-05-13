const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')


mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    logger.info("Connected to MongoDB")
}).catch(error => {
    logger.error("An error occurred while connecting to DB: ", error)
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app