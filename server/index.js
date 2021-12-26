const express = require('express')
const dfd = require("danfojs-node")
const app = express()
const port = 5000
// const db = csvdb("data/CO2_emmisions.csv", ["Year","Albania","Afghanistan"], ",");

const get_emission_data = async() => {
    const res = await dfd
      .read_csv("./data/CO2_emmisions.csv")
      .then((df) => {
        return df;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
      return res;
  };

app.get('/', (req, res) => {
  res.send('Normal Get Request')
})

app.get('/all_emissions', async(req, res) => {
    res.send(await get_emission_data())
  })

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

  