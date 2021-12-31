const DataFrame = require('dataframe-js').DataFrame;

const getEmissionData = async() => {
    const res = await DataFrame
      .fromCSV("/Users/hersh/Desktop/UCLA/Climate_Change_Webapp/Climate_Change_Webapp/server/data/co2_kt.csv")
      .then((df) => {
        return df.toJSON();
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
      return res;
  };

  module.exports = getEmissionData
