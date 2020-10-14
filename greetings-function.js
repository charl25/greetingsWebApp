module.exports = function GreetingApp() {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/users';
    const pool = new Pool({
        connectionString
    });
    let appCount=0
    let greeting = ""
    let list=[]

    async function setGreeting(person, lang) {
        //count = count + 1
        // if(appCount<20 && !(list.includes(person))){
        //     appCount++
        // }

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
        const greetedList = await pool.query(`select names, count from users`);
        return greetedList.rows;
    }

    async function reset(){
       return await pool.query(`delete from users`)
    }

    return {
        setGreeting,
        greetPerson,
        counter,
        greeted,
        reset
    }
}