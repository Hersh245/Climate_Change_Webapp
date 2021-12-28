var express = require('express');
var router = express.Router();
const DataFrame = require('dataframe-js').DataFrame;

var getEmisionData = require('../getEmissionData');

router.get('/', (req, res) => {
    res.send('Enter year')
})



module.exports = router