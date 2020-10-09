module.exports = function GreetingApp() {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/users';
    const pool = new Pool({
        connectionString
    });
    let greeting = ""


    async function setGreeting(person, lang) {
        //count = count + 1

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
        let count = await pool.query('select count(*) as id from users');
        return { count }
    }

    async function greeted() {
        const people = await pool.query('select id, names, count from users');
        return people.rows;
    }

    return {
        setGreeting,
        greetPerson,
        counter,
        greeted
    }
}