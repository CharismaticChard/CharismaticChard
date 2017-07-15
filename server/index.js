'use strict';
const app = require('./app');
const db = require('../db');
var express = require('express');
var rp = require('request-promise');
var bodyParser = require('body-parser');
var twilioMiddleware = require('./twilio/twilio_middleware.js');

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});


app.post('/twilio', twilioMiddleware.twilioMiddleware );



