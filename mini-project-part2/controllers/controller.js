
const axios = require('axios');
const Utils = require('../Utils/datautils');
const logger = require('../Utils/logger');

const api_key = process.env.API_KEY || '160d5400-284e-11ec-9521-8dc2b036fa8f';

exports.fetchcurrency = async(req, res) => {
    logger.info(' GET /current route is accessed ');
    try{
        
        const date = new Date().toLocaleString({ timeZone: "Asia/Jakarta" }); // get current date
        const { data } = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=${api_key}&base_currency=USD`); // fecth data from api
        const found = await Utils.checkupdate(data.data.IDR); // check existing data
        var status = '';
        if(found.length === 0){ // if not exist
            await Utils.createnew(data.data.IDR, date) // create new data
            status = 'NEW';
            logger.info(' NEW DATA CREATED ')
        }
        else{ // already exist
            await Utils.updatedata(data.data.IDR, date) // update data
            status = 'UPDATED';
            logger.info(' DATA UPDATED ')
        }
        const show = {status : status, convert : 'USD_IDR', conversion:data.data.IDR, date: date } // structuring  data to json
        console.log(show)
        res.json(show)
        res.status(200)
    }
    catch(err){
        console.log(err);
        res.status(500)
        logger.error(' ERROR ')
    } 
}

exports.fetchalldata = async(req, res) => { // fetch all data from database
    logger.info(' GET /recorded route is accessed ')
    try{
        const data = await Utils.fetchalldata()
        res.status(200);
        res.json(data)
        logger.info(' fetch all recorded data ')
    }
    catch(err){
        console,log(err);
        res.status(500)
        logger.error(' ERROR ')
    }
}
