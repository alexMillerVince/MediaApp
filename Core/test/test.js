'use strict';

const assert = require('assert');
const db = require('../lib/db');

describe('Test', function () {
   describe('#firstTest', function () {
       it('should return true', function () {
           assert.equal(true, true);
       });
   })
});

describe('Database', function () {
    describe('#addMovie()', function () {
        it('should save to databse without any error', function (done) {
            db.addMove('Test', 2019, 7, 'Action', 1, 30, 'Description', done);
        });
    })
});