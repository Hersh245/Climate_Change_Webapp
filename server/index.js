const express = require('express')
const app = express()
const port = 5000

var countryRouter = require('./routes/country');
var yearRouter = require('./routes/year');
var homeRouter = require('./routes/home.js')


app.use('/', homeRouter)
app.use('/country', countryRouter);
app.use('/year', yearRouter);


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

  