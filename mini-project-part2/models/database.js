
const mongoose = require('mongoose');

const idrSchema = mongoose.Schema({
    convert :{
        type : String,
        required : true
    },
    conversion:{
        type : Number,
        required : true
    },
    updated:{
        type : Date,
        required : true
    }
});

const Idr = mongoose.model('Idr', idrSchema);

module.exports = Idr;