const PORT = process.env.PORT || 3000;
const db_PORT = process.env.db_PORT || 27017;

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/router');
const cron = require('node-cron');
const expressPinoLogger = require('express-pino-logger');
const logger = require('./Utils/logger');
const http = require('http');
const https = require('https');

const eplMiddleware = expressPinoLogger({
    logger : logger,
    useLevel : 'http'
});

const options = {
    host : 'localhost',
    port : 3000,
    path : '/current'
};


const app = express();

mongoose.connect(`mongodb://localhost:${db_PORT}/covidData`, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => {
        console.log("MONGO CONNECTED!")
    })
    .catch(err =>{
        console.log("MONGO CONNENCTION ERROR!")
        console.log(err)
    });

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
app.use(eplMiddleware);


cron.schedule("59 11 * * *", function() { // run task to call api every 11.59 Jakarta time
    const req = http.get(options, function(res){
        logger.info('ACCESS ON 11.59 JAKARTA TIME')
        console.log('STATUS: ' +  res.statusCode);
        console.log('HEADERS: '+ JSON.stringify(res.headers));

        var bodyChunks = [];
        res.on('data', function(chunk) {
        bodyChunks.push(chunk);
        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            console.log('BODY: ' + body);
            })
        })
    }, {
    scheduled : true,
    timezone : 'Asia/Jakarta'
});



app.listen(PORT, () =>{
    console.log(`LISTENING ON PORT ${PORT}`)
})
