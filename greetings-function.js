module.exports = function GreetingApp() {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/users';
    const pool = new Pool({
        connectionString
    });
    let greeting = ""

    async function setGreeting(name, lang) {
        //count = count + 1
        // if(appCount<20 && !(list.includes(person))){
        //     appCount++
        // }

        var person = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

        if (lang === "isixhosa") {
            greeting = "Molo, " + person
        } else if (lang === "english") {
            greeting = "Hello, " + person
        } else if (lang === "afrikaans") {
            greeting = "More, " + person
        }

        const item = await pool.query(`select id from users where names = $1`, [person])
        if (item.rowCount === 0) {
            await pool.query(`insert into users (names, count) values ($1, 0)`, [person]);
        }
        await pool.query(`update users set count = count+1 where names = $1`, [person])

    }

    async function greetPerson() {
        return { greeting }
    }

    async function counter() {
        let counter = await pool.query(`select count(*) as counter from users`);
        let count = counter.rows[0].counter
        return {count}
    }

    async function greeted() {
        const greetedList = await pool.query(`select names from users`);
        return greetedList.rows;
    }

    async function eachPerson(name) {
        const counter = await pool.query(`select count from users where names = $1`, [name])
        const num = counter.rows[0];
        return num.count
    }

    async function reset(){
       var clear= await pool.query(`delete from users`)
       return clear.rows
    }

    return {
        setGreeting,
        greetPerson,
        counter,
        greeted,
        eachPerson,
        reset
    }
}