const assert = require('assert')
const Fun = require('../greetings-function')

describe("the greeted database", function(){

	const fun = Fun()

    const pg = require("pg");
    const Pool = pg.Pool;
	const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/users';
	const pool = new Pool({
		connectionString
    });
    const INSERT_QUERY = "insert into users (name,greeted) values ($1, $2)";

    beforeEach(async function () {
		await pool.query("delete from users");
    });
    
    it("should be able to add a greeting", async function () {

		 await pool.query(INSERT_QUERY, ["jack", 1]);
		 await pool.query(INSERT_QUERY, ["shaun", 1]);

		const results = await pool.query("select count(*) from users");
		
		// how many bookings should have been added?
		assert.equal(0, results.rows[0].count);

	});

	it('should be able to return the proper counter of the app with a name repeated', async function(){

		await fun.setGreeting("Charl","xhosa")
		await fun.setGreeting("Charl","xhosa")

		const results = await pool.query("select count(*) as counter from users");
		
		await assert.equal(1, results.rows[0].counter)

	})

	it('should be able to get a how many times a single person was greeted', async function(){
		await fun.setGreeting("KG","english")
		await fun.setGreeting("Charl","xhosa")
		await fun.setGreeting("Charl","xhosa")
		await fun.setGreeting("Charl","xhosa")
		

		const results = await pool.query("select count from users where names = $1", ["Charl"]);

		await assert.equal(3, results.rows[0].count)
	})
})
