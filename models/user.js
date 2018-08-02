'use strict';

// The User model
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true }
});

// Adiciona os índices
userSchema.index({ email: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('User', userSchema);