'use strict'

var chai = require('chai');
var expect = chai.expect;

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('GET /order/:orderId', function() {
    /*global context*/
    context("The order exists", function() {
        it('will respond with a 200 code',function(){
            expect(true).equal(true);
        });
        describe("will respond with a HAL document for the order", function() {

        });
    });
});