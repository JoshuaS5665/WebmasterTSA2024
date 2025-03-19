const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const menuItemSchema = new Schema({
    item:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    }

}, {timestamps:true});

const MenuItem = mongoose.model('MenuItem', menuItemSchema); 
module.exports = MenuItem; 