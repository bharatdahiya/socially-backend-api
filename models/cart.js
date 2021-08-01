const mongoose = require('mongoose');
const product = require('./product');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: { type: String, required: true },
    userId: { type: String, required: true ,ref:'user'},
    type: {type: Boolean, required: true},
    list : {type:Array,required: true}
});
module.exports = mongoose.model('Product', productSchema);