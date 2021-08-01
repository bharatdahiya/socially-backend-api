const mongoose = require('mongoose');
const Cart = require('./cart');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id: { type: String},
    name: { type: String,required : true},
    cart: {type: String,required : true},
    list: {type:Array,required : true}
});
module.exports = mongoose.model('carts', cartSchema,'cart');