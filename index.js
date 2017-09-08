const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

app.use(morgan('common'));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/game-of-life', function(request, response) {
  const html = fs.readFileSync(`${__dirname}/submodules/the-game-of-life/public/life.html`, {encoding: "utf-8"});
  response.render(html);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


