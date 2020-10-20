const GreetingApp = require('./greetings-function')
const greetingApp = GreetingApp()

module.exports = function greetingsRoutes(){

    async function home (req, res, next) {
        try {
            let greetedList = await greetingApp.greeted()
            res.render('index', { greetedList })
        } catch (err) {
            next(err)
        }
    }

    async function greeting(req, res, next) {
        //console.log(req.body.user)
        let name = req.body.user
        let lang = req.body.language
        let greeting
    
        //greetingApp.setGreeting(name, lang)
        try {
            if (name === '' && lang === undefined) {
                req.flash('error', 'Enter name and choose a language')
            } else if (name === '') {
                req.flash('error', 'Enter name')
            }
            else if (lang === undefined) {
                req.flash('error', 'choose a language')
            } else if (!(/[a-zA-z]$/.test(name))) {
                req.flash('error', 'enter a proper name')
            } else {
                await greetingApp.setGreeting(name, lang)
                greeting = await greetingApp.greetPerson()
            }
    
            let greetedList = await greetingApp.greeted()
            let count = await greetingApp.counter()
            console.log(count)
    
            res.render('index', {
                greet: greeting,
                greetedList,
                counter: count
            })
        } catch (err) {
            next(err)
        }
    }

    async function reset (req, res, next) {
        try{ let clear = await greetingApp.reset()
         res.render('index', { clear })}
         catch(err){
             next(err)
         }
     }

     return{
         home,
         greeting,
         reset
     }
}