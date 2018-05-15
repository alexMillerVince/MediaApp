'use strict';

const Datastore = require('@google-cloud/datastore');

const projectId = process.env.PROJECT_ID;

const datastore = new Datastore({
    projectId: projectId,
});


module.exports.getAllMovies = function () {
    //Todo getAllMove
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