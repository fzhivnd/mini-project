const Covid = require('../models/covid');
const mongoose = require('mongoose');



exports.find = async(provinsi)=>{// Check data in database
    const found = await Covid.find({provinsi:provinsi}).select("-_id");
    return found;
};

exports.createnewdata = async(datacovid) =>{ // Add data to database
    const newdata = new Covid(datacovid);
    await newdata.save();

};

exports.updatedata = async(datacovid) =>{ // Update existing data in database
    const update = await Covid.updateOne(datacovid);
};


exports.getalldatabase = async()=>{ // fecth all data from database
    const data = await Covid.find({}).select('-_id');
    const temp = {Data:[]}
    for (let item of data){
        temp.Data.push(item)
    }
    return temp;
};

