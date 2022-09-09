const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    id: Number,
    verifySettings: Object
})

module.exports = mongoose.model('servers', Schema)