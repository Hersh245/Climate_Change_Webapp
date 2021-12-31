const DataFrame = require('dataframe-js').DataFrame;

const getCountryData = async() => {
    const res = await DataFrame
      .fromCSV("/Users/hersh/Desktop/UCLA/Climate_Change_Webapp/Climate_Change_Webapp/server/data/countries.csv")
      .then((df) => {
        return df.toJSON();
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
      return res;
  };

  module.exports = getCountryData