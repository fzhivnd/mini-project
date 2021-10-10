const controller = require('../controllers/controller');
const express = require('express');
const router = express.Router();


router.get('/current', controller.fetchcurrency);
router.get('/recorded', controller.fetchalldata);

module.exports = router;