'use strict';

// The Category model
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var categorySchema = new Schema({
    description: {type: String, required: true },
    user_id: {type: String, required: true},
    parent_id: String
});

// Adiciona os índices
categorySchema.index({ user_id: 1, description: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Category', categorySchema);