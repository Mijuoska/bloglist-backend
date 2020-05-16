const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

 beforeEach(async () => {
     await User.deleteMany({})

     let newUser = new User(helper.initialUsers[0])
     await newUser.save()


     const passwordHash = await bcrypt.hash('sekret', 10)
     const user = new User({
         username: 'root',
         passwordHash
     })

     await user.save()
 })

describe('when there is initially one user at db', () => {
   

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ptrabuc',
            name: 'Pauline Trabuc',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })


     test('username must be supplied', async () => {
         const usersAtStart = await helper.usersInDb()

         const newUser = {
             name: 'Pauline Trabuc',
             password: 'salainen',
         }

         await api
             .post('/api/users')
             .send(newUser)
             .expect(400)
        
         const usersAtEnd = await helper.usersInDb()
         expect(usersAtEnd).toHaveLength(usersAtStart.length)
     })

     test('username must be unique', async () => {
         const usersAtStart = await helper.usersInDb()

         const newUser = {
             username: 'mijuoska',
             name: 'Miika Kallasoja',
             password: 'salainen',
         }

         await api
             .post('/api/users')
             .send(newUser)
             .expect(400)

         const usersAtEnd = await helper.usersInDb()
         expect(usersAtEnd).toHaveLength(usersAtStart.length)
     })

     test('password must be supplied', async () => {
         const usersAtStart = await helper.usersInDb()

         const newUser = {
             username: 'mkallasoja',
             name: 'Miika Kallasoja',
         }

         await api
             .post('/api/users')
             .send(newUser)
             .expect(400)

         const usersAtEnd = await helper.usersInDb()
         expect(usersAtEnd).toHaveLength(usersAtStart.length)
     })

     test('password must be at least 3 characters', async () => {
         const usersAtStart = await helper.usersInDb()

         const newUser = {
             username: 'mkallasoja',
             name: 'Miika Kallasoja',
             password: 'xy'
         }

         await api
             .post('/api/users')
             .send(newUser)
             .expect(400)

         const usersAtEnd = await helper.usersInDb()
         expect(usersAtEnd).toHaveLength(usersAtStart.length)
     })

})
afterAll(() => {
    mongoose.connection.close()
})