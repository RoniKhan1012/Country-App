import { async } from 'q';
import React, {useState, useEffect} from 'react';

import "./app.css";
import Countries from './components/Countries';
import Search from './components/Search';

const url = "https://restcountries.com/v3.1/all"; 

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const fetchData = async (url) => {
    setIsLoading(true);

    try{
        const response = await fetch(url);
      const data = await response.json();

      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
      setError(null);
    }catch(error){
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(url)
  }, [])

  const handleRemoveCountry = (name) => {
    const filter = filteredCountries.filter((country) => country.name.common !== name)

    setFilteredCountries(filter);
  }

  const handleSearch = (searchValue) => {
    const value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    })
    setFilteredCountries(newCountries);
  }
  
  return <>
  <h1>Country App</h1>
  <Search onSearch={handleSearch} />
  {isLoading && <h2>Loading....</h2>}
  {error && <p>{error.message}</p>}
  {countries && <Countries countries = {filteredCountries} removeCountry = {handleRemoveCountry}/>}
  </>;

};

export default App