var express = require('express');
var router = express.Router();
const DataFrame = require('dataframe-js').DataFrame;

var getEmissionData = require('../functions/getEmissionData');
var getCountryData = require('../functions/getCountryData');

router.get('/', (req, res) => {
    res.send('Home')
})
  
router.get('/allEmissionData', async(req, res) => {
      res.send(await getEmissionData())
})

router.get('/allCountryData', async(req, res) => {
    res.send(await getCountryData())
})

module.exports = router