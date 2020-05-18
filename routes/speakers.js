const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (request, response) => {
    const artwork = await speakerService.getAllArtwork();
    const speakers = await speakerService.getList();
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artwork });
  });

  router.get('/:shortname', async (request, response) => {
    const artwork = await speakerService.getArtworkForSpeaker(request.params.shortname);
    const speaker = await speakerService.getSpeaker(request.params.shortname);
    response.render('layout', {
      pageTitle: speaker.name,
      template: 'speaker-details',
      speaker,
      artwork,
    });
  });

  return router;
};
