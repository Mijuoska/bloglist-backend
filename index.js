const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
require('dotenv').config()


try {
mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
} catch(err) {
    console.log(err)
}

app.use('/api/blogs', blogRouter)
app.use(cors())
app.use(express.json())


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})

module.exports = app