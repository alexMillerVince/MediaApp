'use strict';

const Datastore = require('@google-cloud/datastore');

const projectId = process.env.PROJECT_ID;

const datastore = new Datastore({
    projectId: projectId,
});


module.exports.getAllMovies = function (callback) {
    const query = datastore.createQuery('Movie').order('title');

    datastore
        .runQuery(query)
        .then(results => {
            const movies = results[0];
            callback(null, 'Success');

            return movies;
        })
        .catch(error => {
            console.log('Error:', error);
            callback(error, 'Error');
        })
};

module.exports.getMovie = function(movieId, callback) {
    const movieKey = datastore.key(['Movie', movieId]);
    const query = datastore.createQuery('Movie').filter('__key__', movieKey);


    datastore
        .runQuery(query)
        .then(results => {
            const movie = results[0];
            callback(null, 'Success');
            return movie;
        })
        .catch(error => {
            console.log('Error:', error);
            callback(error, 'Error');
        })
};

module.exports.addMove = function (title, year, rating, genre, hour, min, description, callback) {
    const kind = 'Movie';
    const key = datastore.key([kind]);
    const data = {
        key: key,
        data: {
            title: title,
            year: year,
            rating: rating,
            genre: genre,
            hour: hour,
            min: min,
            description: description,
        }
    };

    datastore
        .save(data)
        .then(() => {
            callback(null, 'Success');
        })
        .catch(error => {
            console.error('Error:', error);
            callback(error, 'Error');
        });
};