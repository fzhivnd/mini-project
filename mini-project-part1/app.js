const PORT = process.env.PORT || 3000;
const db_PORT = process.env.db_PORT || 27017;

const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes/router');
const expressPinoLogger = require('express-pino-logger');
const logger = require('./Utils/logger');

const eplMiddleware = expressPinoLogger({
    logger : logger,
    useLevel : 'http'
});

const app = express();




mongoose.connect(`mongodb://localhost:${db_PORT}/covidData`, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => {
        console.log("MONGO CONNECTED!")
    })
    .catch(err =>{
        console.log("MONGO CONNENCTION ERROR!")
        console.log(err)
    })

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
app.use(eplMiddleware);

app.listen(PORT, () =>{
    console.log(`LISTENING ON PORT ${PORT}`)
})
