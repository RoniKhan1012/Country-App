import { async } from 'q';
import React, {useState, useEffect} from 'react';

import "./app.css";
import Countries from './components/Countries';

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
  
  return <>
  <h1>Country App</h1>
  {isLoading && <h2>Loading....</h2>}
  {error && <p>{error.message}</p>}
  {countries && <Countries countries = {filteredCountries} removeCountry = {handleRemoveCountry}/>}
  </>;

};

export default App