
const controller = require('../controller/controller');
const express = require('express');
const router = express.Router();




router.get('/covid', controller.fetchalldata)
router.get('/covid/:provinsi', controller.fetchprovincedata)
router.get('/database/covid', controller.getdatabasedata)


module.exports = router;