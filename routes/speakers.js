const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.send('Speakers list');
    // response.sendFile(path.join(__dirname, './static/index.html'));
  });

  router.get('/:shortname', (request, response) => {
    return response.send(`Details page of ${request.params.shortname}`);
  });

  return router;
};
