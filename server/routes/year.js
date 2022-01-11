var express = require('express');
var router = express.Router();
const DataFrame = require('dataframe-js').DataFrame;

var getEmissionData = require('../functions/getEmissionData');

const getRow = (data, index) => {
    row = {}
    parsedData = JSON.parse(data)
    for (let id in parsedData) {
        row[id] = parsedData[id][index]
        if(row[id] === undefined) {return null}
    }
    return row;
  };

router.get('/', async (req, res) => {
    const emissionData = JSON.parse(await getEmissionData());
    res.send(emissionData.Year)
})

router.get("/:year", async (req, res) => {
    const year = parseInt(req.params.year);
    const emissionData = await getEmissionData();
    try {
        const yearValues = getRow(emissionData, year - 1971)
        if(yearValues) {
            res.send(yearValues)
          }
        else {
             res.send("Invalid Year or No Data");
            }
    }
    catch (err) {
        res.send(err);
    }
  });

  router.get("/:year/index", async (req, res) => {
    const year = parseInt(req.params.year);
    const emissionData = await getEmissionData();
    try {
        const yearValues = getRow(emissionData, year - 1971)
        if(yearValues) {
            res.send(String(year - 1971))
          }
        else {
             res.send("Invalid Year or No Data");
            }
    }
    catch (err) {
        res.send(err);
    }
  });

  




module.exports = router