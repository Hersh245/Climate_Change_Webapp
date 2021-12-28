var express = require("express");
var router = express.Router();
const DataFrame = require("dataframe-js").DataFrame;

var getEmissionData = require("../getEmissionData");

router.get("/", (req, res) => {
  res.send("Enter Country Id");
});

router.get("/:countryId", async (req, res) => {
  const id = String(req.params.countryId);
  const emissionData = JSON.parse(await getEmissionData());
  emissionValues = emissionData[id];
  emissionValues
    ? res.send(emissionValues)
    : res.send("Invalid Country or No Data");
  //res.send(id)
});

router.get("/:countryId/year", async (req, res) => {
  const id = String(req.params.countryId);
  const emissionData = JSON.parse(await getEmissionData());
  emissionValues = emissionData[id];
  if (emissionValues) {
    const message = "Enter year for " + id;
    res.send(message);
  } else {
    res.send("Invalid Country or No Data");
  }
});

router.get('/:countryId/year/:year', async (req, res) => {
    const id = String(req.params.countryId)
    const year = req.params.year
    const emissionData = JSON.parse(await getEmissionData())
    emissionValues = emissionData[id]
    if (emissionValues) {
        const value = emissionValues[parseInt(year) - 1971]
        if(value) {
            res.send(value)
        } else {
            res.send("Invalid Year or No Data")
        }
      } else {
        res.send("Invalid Country or No Data");
      }
})

module.exports = router;
