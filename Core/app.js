'use strict';

const Hapi = require('hapi');
const  nCore = require('./lib/ncore');
const config = require('./config');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const ncore = new nCore(config);

server.route({
    method : 'POST',
    path : '/refresh',
    handler : (request, reply) => {
        ncore.start();

        return request.payload;
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();