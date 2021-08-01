const mongoose = require('mongoose');
const product = require('./product');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    label: {type: Array, required: true,ref:'category'},
    quantity : {type:Number,required: true},
    cost : {type:Number,required: true}
});
module.exports = mongoose.model('Product', productSchema);