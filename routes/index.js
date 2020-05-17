const express = require('express');

const router = express.Router();

// router.get('/speakers', (request, response) => {
// response.sendFile(path.join(__dirname, './static/speakers.html'));
// });

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome' });
    // response.sendFile(path.join(__dirname, './static/index.html'));
  });

  return router;
};
