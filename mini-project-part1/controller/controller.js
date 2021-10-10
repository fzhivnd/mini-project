
const axios = require('axios');
const Utils = require('../Utils/covidutils');
const logger = require('../Utils/logger');

exports.fetchprovincedata = async(req, res) =>{
    const { provinsi } = req.params; // get req params
    logger.info(`GET /covid/${provinsi.toLowerCase()} route is accessed`);
    const date = new Date().toLocaleString({ timeZone: "Asia/Jakarta" }); // get current date
    try{
        // fetch covid data from api
        const { data } = await axios.get('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=Provinsi,Kasus_Posi,Kasus_Semb,Kasus_Meni&returnGeometry=false&outSR=4326&f=json');
        var temp_data = null;
        if( data!=null ){ // check params
            for (let i of data.features){
                if(i.attributes.Provinsi.toLowerCase() === provinsi.toLowerCase()){
                    temp_data =  i;
                }
            }
            if(temp_data!=null){
                const exist = await Utils.find(temp_data.attributes.Provinsi); // check data in database
                const cleandata = { // structuring data
                    provinsi : temp_data.attributes.Provinsi,
                    positif : temp_data.attributes.Kasus_Posi,
                    sembuh : temp_data.attributes.Kasus_Semb,
                    meninggal : temp_data.attributes.Kasus_Meni,
                    update : date
                }
                if(exist.length===0){   // if no province data in database
                    await Utils.createnewdata( cleandata ); // add data
                    logger.info(` ${provinsi.toUpperCase()} DATA ADDED TO DATABASE `)
                }
                else{
                    await Utils.updatedata( cleandata ); // update province data
                    logger.info(` ${provinsi.toUpperCase()} DATA UPDATED `)
                }
                res.status(200);
                res.json(cleandata);
             }
            else{
                res.status(404);
                res.json({Status : 'Province Not Found!'})
                logger.warn(' NOT FOUND!')
            }
        }

    }
    catch(err){
        logger.error(' ERROR ')
        res.status(500)
        console.log(err)
    }
};

exports.fetchalldata = async(req, res) =>{
    logger.info('GET /covid route is accessed');
    try{
        // fetch data from api
        const { data } = await axios.get('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=Provinsi,Kasus_Posi,Kasus_Semb,Kasus_Meni&returnGeometry=false&outSR=4326&f=json');
        res.status(200);
        items = data.features;
        const alldata = {Data:[]}
        // restructure data to json object
        for (let item of items){
            alldata.Data.push(item.attributes);
        }
        res.json(alldata)
        
    }
    catch(err){
        logger.error(' ERROR ')
        console.log(err);
        res.status(500);
    }
};

exports.getdatabasedata = async(req, res)=>{
    try{
        logger.info('GET /database/covid route is accessed')
        data = await Utils.getalldatabase(); // fecth all data from database  
        res.status(200);
        res.json(data);
        logger.info(' FECTH ALL DATA FROM DATABASE')
    }catch(err){
        res.status(500)
        logger.error(' ERROR ')
        console.log(err)
    }
}