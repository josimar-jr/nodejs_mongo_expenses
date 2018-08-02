'use strict';

// The Account model
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var accountSchema = new Schema({
    account: {type: String, required: true},
    user_id: {type: String, required: true}
});

// Adiciona os índices
accountSchema.index({ user_id: 1, account: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Account', accountSchema);