import React, { Component } from 'react'
import Select from 'react-select'
const axios = require('axios');

const options = []

const setOptions = async() => {
    const response = await axios.get('http://localhost:5000/allCountryData')
    const countryID = response.data.id
    const countryName = response.data.name
    console.log(countryID)
    console.log(countryName)
    for(let i = 0; i < countryID.length; i++) {
        const data = {value: countryID[i], label: countryName[i]}
        options.push(data)
    }
}

function SearchBar(props) {
    setOptions();
    return(
        <Select 
            options={options}
            isMulti 
        />
    )
}

export default SearchBar;
  