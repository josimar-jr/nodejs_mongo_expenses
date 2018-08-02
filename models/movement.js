'use strict';

// The Movement model
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var movementSchema = new Schema({
    user_id: {type: String, required: true},
    movementDate: {type: Date, defaut: Date.now, required: true },
    account_from: {type: String, required: true},
    category_id: {type: String, required: true},  // precisa de um default 
    title: {type: String, required: true},
    value: {type: Number, required: true},
    movementType: {type: String, required: true, enum: ['Receita','Despesa','Transferencia'] },
    description: String
});

// Adiciona os índices
movementSchema.index({ user_id: 1, movementDate: 1 }, { sparse: true });
movementSchema.index({ user_id: 1, account_from: 1 }, { sparse: true });
movementSchema.index({ user_id: 1, category_id: 1 }, { sparse: true });

module.exports = mongoose.model('Movement', movementSchema);