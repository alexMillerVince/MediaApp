'use strict'

const console_log = true;
const fs = require('fs');

const log = (input) => {
    const date = new Date();
    if (input === '') {
        input = '### END ###';
    }
    input = date.getDay().toString()+ '/' + date.getDate().toString() + '/'
        + date.getFullYear().toString() + ' # ' + input;

    fs.appendFile('log.log', input + '\r\n', () => {});
    if (console_log) {
        console.log(input);
    }
};

module.exports = log;