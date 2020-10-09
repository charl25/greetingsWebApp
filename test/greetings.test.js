const assert = require('assert')

describe("the greeted database", function(){

    const pg = require("pg");
    const Pool = pg.Pool;
	const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/users';
	const pool = new Pool({
		connectionString
    });
    const INSERT_QUERY = "insert into greeted (name,greeted) values ($1, $2)";

    beforeEach(async function () {
		await pool.query("delete from greeted");
    });
    
    it("should be able to add a greeting", async function () {

		await pool.query(INSERT_QUERY, ["jack", 1]);
		await pool.query(INSERT_QUERY, ["shaun", 1]);

		const results = await pool.query("select count(*) from greeted");
		
		// how many bookings should have been added?
		assert.equal(2, results.rows[0].count);

	});
})

//const GreetingFunction = require('../greetings-function')

// describe('Greetings App', function () {

//     const greetingFunction = GreetingFunction()

//     it('should greet 3 people in any language and return the count as 3', function () {
//         greetingFunction.setGreeting("Charl", "english")
//         greetingFunction.setGreeting("Charl", "isixhosa")
//         greetingFunction.setGreeting("Charl", "afrikaans")
//         assert.equal(3, greetingFunction.counter().count)
//     })
//     it('should take a name and greet it in Englixh', function () {
//         greetingFunction.setGreeting("Charl", "english")
//         assert.equal("Hello, Charl", greetingFunction.greetPerson().greeting)
//     });

// })