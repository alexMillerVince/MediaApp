'use strict';

const Datastore = require('@google-cloud/datastore');

const projectId = process.env.PROJECT_ID;

const datastore = new Datastore({
    projectId: projectId,
});


module.exports.getAllMovies = function () {
    //Todo getAllMove
};

module.exports.addMove = function (title, year, callback) {
    const kind = 'Movie';
    const key = datastore.key([kind]);
    const data = {
        key: key,
        data: {
            title: title,
            year: year,
        }
    };

    datastore
        .save(data)
        .then(() => {
            console.log(`Saved ${data.key}: ${data.data.title}`);
            callback(null, 'Success');
        })
        .catch(error => {
            console.error('Error:', error);
            callback(error, 'Error');
        });
};