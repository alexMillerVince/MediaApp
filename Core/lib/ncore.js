'use strict';


const request = require('request').defaults({jar: true});
const fs = require('fs');
const jsdom = require("jsdom");
const $ = require("jquery")(jsdom.jsdom().defaultView);
const log = require('./log');
const db = require('./db');

const config = require('../config.js');

class ncore {
    constructor (config) {
        this.config = config;
        this.elements = [];
        this.key = '';
    }

    login (callback) {
        log('Login');
        request.post(
            'https://ncore.cc/login.php',
            {
                form: {
                    'set_lang':  'hu',
                    'submitted': 1,
                    'nev': config.user.username,
                    'pass': config.user.pass,
                    'submit': 'Belépés!'
                }
            },
            function (error, response, body) {
                callback();
            }
        );
    }

    collectIds (search, callback) {
        let self = this,
            elements = [];

        if (search === '') {
            return;
        }

        request.post(
            'https://ncore.cc/torrents.php',
            {
                form: {
                    'mire': search.trim(),
                    'miben': 'name',
                    'tipus': 'all_own',
                    'submit.x': 0,
                    'submit.y': 0,
                    'submit': 'Ok',
                    'tags': ''
                }
            },
            function(error, response, body) {
                if (self.key === '') {
                    let downloadUrl = $(body).closest('link[rel="alternate"]').attr('href');
                    self.key = decodeURIComponent(downloadUrl.match(/(\?|&)key\=([^&]*)/)[2]);
                }

                $(body).find('.torrent_konyvjelzo').each(function() {
                    let numb = $(this).attr('onclick').match(/\d/g);
                    let id = numb.join('');
                    elements.push(id);
                });
                $(body).find('.torrent_konyvjelzo2').each(function() {
                    let numb = $(this).attr('onclick').match(/\d/g);
                    let id = numb.join('');
                    elements.push(id);
                });
                log('Searching: "' + search.trim() + '", ' + elements.length + ' found');
                callback(elements);
            }
        );
    }

    start() {
        db.getMoviesToDownload((datas) => {
            const dataStrings = [];
            datas.forEach((data) => {
                const dataString = data.title + ' ' + data.year + ' ' + data.resolution + ' ' + config.search.preferAuthors[0];
                dataStrings.push(dataString);
            });
            this.run(dataStrings);
        });
    }

    run(datas) {
        let self = this,
            allElements = [];

        this._folderInit();
        this.login(() => {
                let datasInterval = setInterval(() => {
                if (datas.length === 0) {
                    clearInterval(datasInterval);

                    if (allElements.length > 0) {
                        self.torrentManager(allElements);
                    }
                    else {
                        log('No new torrent found.');
                    }

                    return;
                }
                let data = datas.pop();
                self.collectIds(data, (elements) => {
                    allElements = allElements.concat(elements);
                });
            }, 2000);

        });
    }

    torrentManager (elements) {
        let self = this;
        log('Downloading torrents...');
        let manager = () => {
            if (elements.length === 0) {
                log('Download is finished.');
                log('');
                return;
            }

            let id = elements.pop();

            try {
                fs.accessSync(config.download.dataPath + id);
                manager();
            } catch (e) {
                let link = 'https://ncore.cc/torrents.php?action=download&id=' + id + '&key=' + self.key;
                let filename = 'torrents/' + id + '.torrent';

                const r = request(link);
                r.on('response',(res) => {
                    res.pipe(fs.createWriteStream(filename));
                });
                r.on('end', () => {
                    log('Download: ' + id);

                    fs.writeFileSync('data/' + id, '');
                });
                setTimeout(() => {
                    manager();
                }, 2000);
            }
        };

        manager();
    }

    _folderInit () {
        try {
            fs.mkdirSync('torrents');
            fs.mkdirSync(config.download.dataPath);
        } catch (error) {

        }
    }
}

module.exports = ncore;
