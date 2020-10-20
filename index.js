const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Route = require('./routes')
const routes = Route()

const app = express()

const session = require('express-session')
const flash = require('express-flash')
//const routes = require('./routes')

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


app.get('/', routes.home)

app.post('/greetings', routes.greeting)

app.post('/reset', routes.reset)

const PORT = process.env.PORT || 3014

app.listen(PORT, function () {
    console.log("App start at port:", PORT)
})