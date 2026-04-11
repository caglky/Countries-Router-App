import { Link } from "react-router-dom";

export default function CountryCard ({ country }){
    return (
        <div className="country-card">
            <img 
            src={country.flags?.png}
            alt={country.name?.common}
            width= "150"
            />
            <h3>{country.name?.common}</h3>
            <p>Population: {country.population?.toLocaleString()}</p>
            <p>Region: {country.region}</p>

            <Link to={`/country/${country.cca3}`}>See Details</Link>
        </div>
    );
}