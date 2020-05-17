const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

const port = 3000;

// setting view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));

// using satic middleware
app.use(express.static(path.join(__dirname, './static')));

app.use('/', routes());

app.listen(port, () => {
  console.log(`Node server running on ${port}`);
});
