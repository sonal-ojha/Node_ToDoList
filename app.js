var express = require('express');

var todoController = require('./controllers/todoController');
var app = express();

// Set Template Engine
app.set('view engine', 'ejs');

// Skip Static files
app.use(express.static('./public'))

todoController(app);

app.listen(3001);
console.log('You are listening to port 3001...');