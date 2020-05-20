const express = require('express');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['random1', 'random2'],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

// setting view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups';

// using satic middleware
app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakerService.getNames();
    response.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
);

// when to other route is matched from above finally it comes to this middleware
app.use((request, response, next) => {
  return next(createError(404, 'File not found'));
});

// error handling middleware
app.use((error, request, response, next) => {
  console.error(error);
  response.locals.message = error.message;

  const status = error.status || 500;
  response.locals.status = status;
  response.status(status);

  response.render('error');
});

app.listen(port, () => {
  console.log(`Node server running on ${port}`);
});
