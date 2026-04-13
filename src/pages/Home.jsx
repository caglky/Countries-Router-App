import { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard"
import SearchBar from "../components/SearchBar";

export default function Home(){
    const [countries, setCountries] = useState([]);
    const [region, setRegion] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 
    const [search, setSearch] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3")
        .then((res) => {
            if (!res.ok) {
                throw new Error ("Data couldn't be fetched");
            }
            return res.json();
        })
        .then((data) => {
            setCountries(data);
        })
        .catch((err) => {
            setError(err.message);
        })
        .finally(() => {
            setLoading(false);
        }); 
    }, []);

    const filteredCountries = countries.filter(country => {
        const matchSearch = (country.name?.common || "").toLowerCase().includes((search || "").toLowerCase());
        const matchRegion = !region || country.region === region;
        return matchSearch && matchRegion;
    });

    return (
    <div className= {darkMode ? "app dark" : "app"}>
        <div className="top-bar">
            <h1>Countries</h1>
            <button onClick={()=> setDarkMode(!darkMode)}>
                {darkMode ? "Light Mode" : "Dark Mode" }
            </button>
        </div>
        <SearchBar search = {search} setSearch={setSearch} />
        <div className="region-filter">
            <select value={region} onChange={(e)=> { setRegion(e.target.value)}}>
                <option value="">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>

        {loading && <h2>Loading...</h2>}
        {error && <h2>Error: {error}</h2>}

        {!loading && !error && (
            <div className="country-list">
                {filteredCountries.map((country) => (
                <CountryCard key = {country.cca3} country= {country}/>
                ))}
            </div>
        )}
        </div>
    );
}