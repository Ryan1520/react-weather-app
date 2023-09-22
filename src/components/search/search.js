import React, { useState, useEffect } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../../api';


const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null)

  const loadOptions = (inputValue) => {

    // API link: https://rapidapi.com/wirefreethought/api/geodb-cities (GeoDB Cities)
    // test API
    // useEffect(() => {
    //   fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=hanoi`, geoApiOptions)
    //   .then(response => response.json())
    //   .then(da => console.log(da.data))
    // })
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
      .then(response => response.json())
      .then(response => ({
          // console.log(response) => ERROR:[react-select-async-paginate] response of "loadOptions" should be an object with "options" prop, which contains array of options.
          options: response.data.map(city => ({
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`
            })
          )
        })
      ) 
      .catch(err => console.error(err));
  }

  

  const handleOnChange = (searchData) => {
    setSearch(searchData)
    onSearchChange(searchData)
  }
  console.log(search)

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  )
}

export default Search;