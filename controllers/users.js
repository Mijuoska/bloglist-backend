const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (!body.username) {
        return response.status(400).send('Please supply a username')
    }

    if (!body.password || body.password.length < 3) {
        return response.status(400).send('Please supply a password that is at least 3 characters long')
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })


    try {
    const savedUser = await user.save()
    response.json(savedUser)
    
    } catch (error) {
    next(error)
    }
    
    })

usersRouter.get('/', async (request, response) => {
    try {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users)
    } catch(exception) {
        next(exception)
    }
})


module.exports = usersRouter