'use strict';

const request = require('request');


module.exports.getPopular = function (callback) {
    const options = { method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        qs: {
            page: '1',
            language: 'en-US',
            api_key: process.env.API_KEY
            },
        body: '{}' };


    request(options, function (error, response, body) {
        if (error) {
            callback(error, 'Error');
            throw new Error(error);
        }

        callback(null, 'Success');

        return body;
    });
};

module.exports.findMovie = function (title, year, callback) {
    const options = { method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        qs: {
            year: year,
            include_adult: 'false',
            page: '1',
            query: title,
            language: 'en-US',
            api_key: process.env.API_KEY
        },
        body: '{}' };

    request(options, function (error, response, body) {
        if (error) {
            callback(error, 'Error');
            throw new Error(error);
        }

        const movie = JSON.parse(body);
        callback(null, 'Success');
        console.log(movie.results[0]);
        return movie;
    });
};