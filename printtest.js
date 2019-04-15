var expect = require("chai").expect
var devCode = require("../lib/devcode")

describe("print()", function() {

   it("Print the names", function() {

	  var results  = devCode.print({first: "Jagadeesh", last: "Govind"})
           
	  expect(results).to.equal("Govind, Jagadeesh")
	
   })
})
