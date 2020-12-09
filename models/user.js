const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongosse = require('passport-local-mongoose');
const { model } = require('./review');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passportLocalMongosse)

module.exports = mongoose.model('User', userSchema);