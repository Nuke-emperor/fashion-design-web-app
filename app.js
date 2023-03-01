
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
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
app.use(bodyParser.urlencoded({ extended: true }))// parse application/json
// app.use(bodyParser.json())
//handlebars MIDDLEWARE
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', function (req, res) {
    const imagelist = []
    imagelist.push({ src: 'images/people_together.jpg' })
    imagelist.push({src:'images/jenkins.jpg'})

    res.render('index', { imagelist:imagelist})
})

app.post('/login', (req, res) => {

    const new_user = {
        username: req.body.name,
        Email: req.body.email,
        Password: req.body.password
    }

    new User(new_user)
        .save()
        .then(() => {
            res.redirect('/login')
        })

})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/sign_up', (req, res) => {
    const Error = []
    const pass1 = req.body.Password1
     const pass2 = req.body.Password2

    if (pass1 != pass2) {
    Error.push({text: 'password does not match'})
    
    }
    if (pass1.length < 8) {
         Error.push({text: 'password must be atleast 8 characters'})
        
    }
    if (Error.length > 0) {
        
        res.render('SignUp', {
            errors: Error,
            Name: req.body.name,
            email: req.body.Email,
            pass1: pass1,
            pass2: pass2,
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/about', (req, res) => {
    res.render('about')
})

 app.get('/services', (req, res) => {
        res.render('services')
 })
    
app.get('/blog', (req, res) => {
    res.render('blog')
     
 })

const port = 5000
app.listen( port, function() {
    console.log('Server started: listening on port', port )
    
})