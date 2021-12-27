const axios = require('axios');
const DataFrame = require('dataframe-js').DataFrame;

const indicatorIDs = [
    {id: "SP.POP.TOTL", name: "population"}, 
    {id: "NY.GDP.MKTP.CD", name: "gdp"}, 
    {id: "EN.ATM.CO2E.KT", name: "co2_kt"},
];

const baseURL = 'http://api.worldbank.org/v2/country';

async function generateCountryFile() {
    let countryDf = new DataFrame([], ['id', 'name', 'capital']);
    for (page = 1; page <= 6; page++) {
        await axios.get(baseURL + '?format=json&page=' + page.toString())
        .then(response => {
            response.data[1].map(country => {
                if (country.capitalCity != '')
                    countryDf = countryDf.push([country.id, country.name, country.capitalCity]);
                });
        })
    }
    countryDf.toCSV(true, './countries.csv');
}

async function getCountryList() {
    let idList = [];
    await DataFrame.fromCSV(__dirname + '/countries.csv').then(df => {
        idList = df.select('id').toArray();
    });
    return idList;
}

async function initializeDF(indicator) {
    let df = new DataFrame([], ['country']);
    const sampleCountry = 'ABW';
    await Promise.all([1,2].map(async page => {
        await axios.get(baseURL + '/' + sampleCountry + '/indicator/' + indicator + '?format=json')
        .then(response => {
            response.data[1].map(datapoint => {
                df = df.withColumn(`${datapoint.date}`)
            })
        })
    }))
    return df;
}

function generateTimeSeriesFiles(countries, indicators) {
    indicators.map(async indicator => {
        let df = await initializeDF(indicator.id);
        await Promise.all(countries.map(async (country, index) => {
            let countryData = {country: country[0]};
            let url = baseURL + '/' + country + '/indicator/' + indicator.id + '?format=json';
            for (page = 1; page <= 2; page++) {
                url = url + "&page=" + page.toString();
                await axios.get(url).then(response => {
                    if (response.data[1] != undefined) {
                        response.data[1].map(datapoint => {
                            countryData[datapoint.date] = datapoint.value;
                        })
                    }
                })
            }
           df = df.push(countryData);
        }))

        //sort countries alphabetically
        df = await df.sortBy('country');

        //transpose
        df = await df.transpose();

        //rename columns
        let newNames = [];
        await Promise.all(df.listColumns().map(async column => {
            const newName = df.getRow(df.count() - 1).get(column)
            newNames.push(newName);
        }));
        df = await df.renameAll(newNames);
        df = await df.head(df.count() - 1);
        df = await df.withColumn('Year', (row, index) => 1971 + index);
        let newCols = ['Year'];
        newCols.push(...df.drop('Year').listColumns());
        df = await df.restructure(newCols);

        df.toCSV(true, indicator.name + '.csv');
    })
}

function valueScaler(a, b) {
    return (a/b).toFixed(2);
}

/*function generateCompoundFile(countryList) {
    const compoundData = [
        {name: gdpPerCapita, values = ['gdp', 'population']},
        {name: co2_ktPerCapita, values = ['co2_kt', 'population']},
        {name: co2_ktPerGdp, values = ['co2_kt', 'gdp']}
    ];

    compoundData.map(variable => {
        const var1 = variable.values[0];
        const var2 = variable.values[1];
        const df1 = await DataFrame.fromCSV(__dirname + '/' + var1 + '.csv');
        const df2 = await DataFrame.fromCSV(__dirname + '/' + var2 + '.csv');

        df1.listColumns().map(country => {

        })
    });
}*/

async function main() {
    const countryList = await getCountryList();
    generateTimeSeriesFiles(countryList, indicatorIDs);
}

main();