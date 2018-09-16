'use strict';

var express = require('express');
var app = express()
var mongoose = require('mongoose');
var importProcess = require('./import.js');

// connect to Mongo when the app initializes
// mongodb://username:password@host:port/database
const mongoUri = process.env.NE_MONGOURI || 'mongodb://localhost:27017/node_dev'
const port = process.env.PORT || 3000
mongoose.connect( mongoUri );

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log(`Mongo connected...`)} );

app.route('/')
  .get(function (req, res) {
    res.send('not implemented yet')
  })
  .post(function (req, res) {
    res.send('not implemented yet')
  })
  .put(function (req, res) {
    res.send('not implemented yet')
  })
  .delete(function (req, res) {
    res.send('not implemented yet')
  })

app.post('/import', (req, res) => importProcess.import(req, res))

app.listen(port);
console.log(`Express server listening on port ${port}`);
