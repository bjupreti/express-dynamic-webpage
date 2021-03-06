const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedbacks = await feedbackService.getList();

      const errors = request.session.feedback ? request.session.feedback.errors : false;

      const successMsg = request.session.feedback ? request.session.feedback.message : false;

      request.session.feedback = {};

      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedbacks,
        errors,
        successMsg,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post(
    '/',
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
      check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('A valid email address is required'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('A message is required'),
    ],
    async (request, response, next) => {
      try {
        const error = validationResult(request);

        if (!error.isEmpty()) {
          request.session.feedback = {
            errors: error.array(),
          };
          return response.redirect('/feedback');
        }
        const { name, email, title, message } = request.body;

        await feedbackService.addEntry(name, email, title, message);
        request.session.feedback = {
          message: 'Thank you for your feedback.',
        };
        debugger;
        return response.redirect('/feedback');
      } catch (err) {
        return next(err);
      }
    }
  );

  return router;
};
