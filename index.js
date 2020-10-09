const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const GreetingApp = require('./greetings-function')

const greetingApp = GreetingApp()
const app = express()

const session = require('express-session')
const flash = require('express-flash')

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


app.engine('handlebars', exphbs({
    layoutsDir: "views/layouts/"
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', async function (req, res) {
    res.render('index',{ greeted: greetingApp.greeted() })
})

app.post('/greetings', async function (req, res) {
    //console.log(req.body.user)
    let name = req.body.user
    let lang = req.body.language
    let greeting

    //greetingApp.setGreeting(name, lang)

    if (name === '' && lang === undefined) {
        req.flash('error', 'Enter name and choose a language')
    } else if (name === '') {
        req.flash('error', 'Enter name')
    }
    else if (lang === undefined) {
        req.flash('error', 'choose a language')
    } else if(!(/[a-zA-z]$/.test(name))){
        req.flash('error', 'enter a proper name')
    } else {
        await greetingApp.setGreeting(name, lang)
        greeting = await greetingApp.greetPerson()
    }

    res.render('index', {
        greet: greeting,
        counter: greetingApp.counter()
    })
})

app.get('/greeted',async function (req, res) {
    var greetedList = await greetingApp.greeted()
    res.render("greeted", { greeted:greetedList })
})

const PORT = process.env.PORT || 3014

app.listen(PORT, function () {
    console.log("App start at port:", PORT)
})