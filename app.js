
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')
passport = require('passport')
const path = require('path')


const app = express()

require('./model/store_users')
 const User = mongoose.model('user')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/users', {
    useMongoseClient: true
})
    .then(() => console.log('mongose connected...'))
.catch(err => console.log(err))

//Middleware
//BODYPARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', function (req, res) {
    res.render('home')
})

app.post('/register', (req, res) => {

    var text = 'you are hero'
    const new_user = {
        username: req.body.name,
        Email: req.body.email,
        Password: req.body.password
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(new_user.Password, salt, (err, hash ) => {
            if (err) throw err
            new_user.Password = hash
            new User(new_user)
                .save()
                .then(() => {
                    res.redirect('/')
                })
        })
    })

})

app.get('/you', (req, res)=> {
    res.render('you')
})

const port = 5000
app.listen( port, function() {
    console.log('Server started: listening on port', port )
    
})