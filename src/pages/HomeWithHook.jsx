import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";

export default function HomeWithHook() {
    const [search, setSearch] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const region = searchParams.get("region") || "";

    const { data: countries, loading, error } = useFetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3"
    );

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        if (selectedRegion) {
            setSearchParams({ region: selectedRegion });
        } else {
            setSearchParams({});
        }
    };

    const filteredCountries = (countries || []).filter((country) => {
        const matchSearch = (country.name?.common || "")
            .toLowerCase()
            .includes((search || "").toLowerCase());
        const matchRegion = !region || country.region === region;
        return matchSearch && matchRegion;
    });

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <div className="top-bar">
                <h1>Countries (Hook)</h1>
                <button onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "Light" : "Dark"} Mode
                </button>
            </div>
            <SearchBar search={search} setSearch={setSearch} />
            <div className="region-filter">
                <select value={region} onChange={handleRegionChange}>
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
                        <CountryCard key={country.cca3} country={country} basePath="/hook/country" />
                    ))}
                </div>
            )}
        </div>
    );
}
