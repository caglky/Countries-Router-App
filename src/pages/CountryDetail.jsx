import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetail(){
    const { code } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=> {
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        .then(res => {
            if (!res.ok) throw new Error ("Country could not be fetched")
            return res.json();
    })
    .then(data => {
        const countryData = Array.isArray(data) ? data[0] : data;
            console.log(countryData);
            setCountry(countryData);
        })
        .catch(err=>{setError(err.message)})
        .finally(()=>{setLoading(false)});
    }, [code]);
    
    if (loading) return <h2>Details are loading...</h2>
    if (error) return <h2>Error: {error}</h2>
    if (!country) return <h2>Country not found.</h2>

    return (
        <div className="detail-page">
            <Link to = "/" >Back to Home</Link>
            <h1>{country.name?.common}</h1>
            <img src = {country.flags?.png} alt={country.name?.common} width= "200" />
            <p><strong>Capital: </strong>{country.capital?.[0] ?? "N/A"}</p>
            {country.region &&<p><strong>Region: </strong>{country.region}</p>}
            <p><strong>Population: </strong>{country.population > 250000  
                ? !country.independent 
                ? <span>Bağımsız Değil</span> 
                :  <span>{country.population?.toLocaleString()} </span> 
                : !country.independent 
                ? <span>Bağımsız</span> : <span>Düşük Nüfuslu Ülke</span>}</p>
            <p><strong>Currincy Info:</strong> {country.currencies[Object.keys(country.currencies)[0]].symbol } { country.currencies[Object.keys(country.currencies)[0]].name}</p>

        </div>
    );
}