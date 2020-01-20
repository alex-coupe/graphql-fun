const mongoose = require('mongoose');
const schema = mongoose.Schema;

const filmSchema = new schema({
    name: String,
    genre: String,
    directorId: String
});

module.exports = mongoose.model('Film', filmSchema);