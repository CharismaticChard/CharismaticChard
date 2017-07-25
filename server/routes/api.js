'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/save-split')
  .post((req, res) => {
    res.redirect(307, '/api/data_allocator');
  });

router.route('/send-split')
  .post((req, res) => {
    res.redirect(307, '/api/twilio');
  });

router.route('/split-sent')
  .post((req, res) => {
    res.sendStatus(201);
  });

router.route('/profile-info')
  .get((req, res) => {
    res.redirect('/api/data_allocator/profile');
  });

router.route('/update-profile')
  .post(middleware.validateForm.validateUpdate)
  // .post(middleware.phoneParser.parseUserPhoneNumber)
  .post((req, res) => {
    res.redirect(307, '/api/data_allocator/update-profile');
  });

module.exports = router;
