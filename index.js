const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(morgan('common'));
app.use('/favicons', express.static('favicons'))
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/the-game-of-life/public/'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(request, response) {
  response.render('pages/index');
});


app.listen(PORT, function() {
  console.log('Node app is running on port', PORT);
});

