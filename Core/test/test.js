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
    /*
    describe('#addMovie()', function () {
        it('should save to databse without any error', function (done) {
            db.addMove('Test_2', 2018, 8, 'Adventure', 2, 16, 'Description', done);
        });
    });
    */

    describe('#getAllMovies()', function () {
        it('should return all movies without any error', function (done) {
            db.getAllMovies(done);
        });
    });

    describe('#getMovie()', function () {
        it('should return the specific movie based on the id without any error', function (done) {
            db.getMovie(5649050225344512, done);
        });
    });
});