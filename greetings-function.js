module.exports = function GreetingApp() {

    let name = []
    let greeting = ""
    let count =0

    let greetedList = []

    function setGreeting(person, lang) {
        if (/[a-zA-z]$/.test(person)) {
            name.push(person)
            count= count+1

            greetedList.push({
                client: person,
                count: 1
            })

            if (lang === "isixhosa") {
                greeting = "Molo, " + person
            } else if (lang === "english") {
                greeting = "Hello, " + person
            } else if (lang === "afrikaans") {
                greeting = "More, " + person
            }
        }
        // else if (!(/[a-zA-z]$/.test(person))) {
        //     greeting = "enter a proper name"
        // }
    }

    function greetPerson() {
        return { greeting }
    }

    function counter() {
         //count = name.length
        return { count }
    }

    function greeted() {
        return greetedList
    }

    return {
        setGreeting,
        greetPerson,
        counter,
        greeted
    }
}