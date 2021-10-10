const mongoose = require('mongoose');
const Idr = require('../models/database');

exports.checkupdate = async(price)=>{ // check existing data
    const found = await Idr.find({conversion : price})
    return found;
};

exports.createnew = async(price, date)=>{ // add data to database
    const convert = 'USD_IDR';
    const newdata = new Idr({convert : convert, conversion : price, updated:date})
    await newdata.save();
};

exports.updatedata = async(price, date)=>{ // update existing data
    const convert = 'USD_IDR';
    const update = await Idr.updateOne({convert : convert, conversion : price, updated:date})
};

exports.fetchalldata = async()=>{ // fetch all  data from database
    const data = await Idr.find({}).select('-_id');
    const temp = {Data:[]};
    for(let item of data){
        temp.Data.push(item)
    }
    return temp;
};