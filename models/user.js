const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //for Unique email

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }] //for one user multiple places
});

userSchema.plugin(uniqueValidator); // for quering fast email

module.exports = mongoose.model('User', userSchema);