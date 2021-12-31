var express = require('express');
var router = express.Router();
const DataFrame = require('dataframe-js').DataFrame;

var getEmissionData = require('../functions/getEmissionData');

router.get('/', (req, res) => {
    res.send('Home')
})
  
router.get('/allEmissions', async(req, res) => {
      res.send(await getEmissionData())
})

router.get('/allEmissions', async(req, res) => {
    res.send(await getEmissionData())
})

module.exports = router