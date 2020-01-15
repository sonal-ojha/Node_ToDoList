// console.log(__dirname);
// console.log(__filename);

// ** Events Module
var events = require('events');

// console.log('events =', events);

const myEvent = new events.EventEmitter();
myEvent.on('EventName', function(message) {
    console.log(message);
})
// myEvent.emit('EventName', 'Hello World!!');


// ** UTIL module
const util = require('util');

const Person = function(name) {
    this.name = name;
}

util.inherits(Person, events.EventEmitter);

const sonal = new Person('sonal');
const sam = new Person('sam');

const people = [sonal, sam];

people.forEach(P => {
    P.on('speaks', function(message) {
        console.log(P.name + ' said ' + message);
    })
});

// sonal.emit('speaks', 'sam is a good person.')

// ** Read & Write Files SYNCRONOUSLY
var fs = require('fs');

// const text = fs.readFileSync('readMe.txt', 'UTF-8');
// console.log('text = ', text);
// fs.writeFileSync('copyReadMe.txt', text);


// ** Read & Write Files in ASYNC Manner

// console.log('Starts Reading..');
fs.mkdir('dist', function() {
    fs.readFile('readMe.txt', 'utf8', function(err, data){
        // console.log('data =', data);
        // fs.writeFile('./dist/writeMe.txt', data);
    });
})
// console.log('Finished Reading..');

// ** Delete Files & Directories
// fs.unlink('copyReadMe.txt');
// fs.unlink('copyReadMe.txt', function() {
//     fs.rmdir('dist');
// });

// fs.mkdirSync('dist');
// fs.rmdirSync('dist');

// ** Create a server that listens to a port.
var http =  require('http');
// var server = http.createServer(function(req, res) {
//     console.log('Request was from URL : ', req.url);
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello World!');
// })

// server.listen(3001, '127.0.0.1');

// ** Buffer AND Streams (Readable, Writable)
// Needs http and fs modules

// var readStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
// var writeStream = fs.createWriteStream(__dirname + '/writeMe.txt');

// readStream.on('data', function(chunk) {
//     console.log('Receve chunks of Data from Buffer');
//     console.log(chunk);
//     writeStream.write(chunk);
// })

// *** PIPES : There is no need to manually listen to 'on' - data event. It automatically does it.
// var readStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
// var writeStream = fs.createWriteStream(__dirname + '/writeMe.txt');
// readStream.pipe(writeStream);

/**
 * Send Data as Chunks to increase Performace level using PIPE.
 */
// var server = http.createServer(function(req, res) {
//     console.log('Request was from URL : ', req.url);
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     var readStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
//     readStream.pipe(res); // write data to the response and close the socket.
// })
// server.listen(3001, '127.0.0.1');

/**
 * Send HTML file as response 
 */
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     var readStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
//     readStream.pipe(res);
// })
// server.listen(3001, '127.0.0.1');

/**
 * Serve Json Data 
 */
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = {
        name: 'Sonal',
        age: '25',
        occupation: 'SE',
    };
    res.end(JSON.stringify(data)); // end accepts either "String/Buffer"
})

/**
 * Routing related response
 */
// var server = http.createServer(function(req, res) {
//     if(req.url === '/' || req.url === '/home') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         fs.createReadStream('index.html').pipe(res);
//     } else if (req.url === '/contact') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         fs.createReadStream('contact.html').pipe(res);
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         fs.createReadStream('NotFoundPage.html').pipe(res);
//     }
// })
// server.listen(3001, '127.0.0.1');

/**
 * EXPRESS
 * HTTP Methods, Get, Post, Put, Delete
**/
var express = require('express');
var app = express();

// app.get('/', function(req, res) {
//     // res.send('This is Home Page from Express...');
//     res.sendFile(__dirname + '/index.html');
// })

// app.get('/contact', function(req, res) {
//     // res.send('This is Contact Page from Express...')
//     res.sendFile(__dirname + '/contact.html');
// })

/**
 * Dynamic ID's from req URL
*/
// app.get('/profile/:name', function(req, res) {
//     res.send(`You requested for Profile of ${req.params.name}...`)
// })

// DYNAMIC TEMPLATE ENGINE: EJS
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
})

// app.get('/contact', function(req, res) {
//     res.render('contact');
// })

app.get('/profile/:name', function(req, res) {
    var data = {
        age: 26,
        nickName: 'sonu',
        lastName: 'ojha',
        occupation: 'SE',
        hobbies: [
            'cooking',
            'eating',
            'travelling',
            'dancing'
        ]
    }
    res.render('profile', {personName: req.params.name, personData: data});
})

//  Static File requests like css styles. Middlewares come to a resue (code that runs between Request and Response)
// Express gives a middleware like app.use('/assets'....)
app.use('/assets', express.static('assets'));

// Query Strings : "?" starts with the query string. Use reuest.query.
// mysite.com/name?rayu&age=26
app.get('/contact', function(req, res) {
    res.render('contact', { queryData: req.query });
})

/**
 * POST: we need body-parser module to read body data. ex: req.body
 */
var body_parser = require('body-parser');
var urlencodedParser = body_parser.urlencoded({extended: false})
app.post('/contact',urlencodedParser, function(req, res) {
    console.log('res.body =', req.body);
    if (req.body) {
        res.render('contactSuccess', { data: req.body });
    }
})

app.listen(3001);
// Note:
// Use nodemailer npm module to notify using mail id's