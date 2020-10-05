const assert = require('assert')

const GreetingFunction = require('../greetings-function')

describe('Greetings App', function () {

    const greetingFunction = GreetingFunction()

    it('should greet 3 people in any language and return the count as 3', function () {
        greetingFunction.setGreeting("Charl", "english")
        greetingFunction.setGreeting("Charl", "isixhosa")
        greetingFunction.setGreeting("Charl", "afrikaans")
        assert.equal(3, greetingFunction.counter().count)
    })
    it('should take a name and greet it in Englixh', function () {
        greetingFunction.setGreeting("Charl", "english")
        assert.equal("Hello, Charl", greetingFunction.greetPerson().greeting)
    });

})