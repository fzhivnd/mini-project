const mongoose = require('mongoose');


const covidSchema = new mongoose.Schema({
    provinsi:{
        type: String,
        required: true
    },
    positif:{
        type: Number,
        required: true,
        min : 0
    },
    sembuh:{
        type: Number,
        required: true,
        min : 0
    },
    meninggal:{
        type: Number,
        required: true,
        min : 0
    },
    update:{
        type: Date,
        required : true
    }
});

const Covid = mongoose.model('Covid', covidSchema);

module.exports = Covid;
