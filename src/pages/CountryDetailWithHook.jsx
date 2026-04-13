import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CountryDetailWithHook() {
    const { code } = useParams();

    const { data, loading, error } = useFetch(
        `https://restcountries.com/v3.1/alpha/${code}`
    );

    const country = Array.isArray(data) ? data[0] : data;

    if (loading) return <h2>Details are loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;
    if (!country) return <h2>Country not found.</h2>;

    return (
        <div className="detail-page">
            <Link to="/hook">Back to Home (Hook)</Link>
            <h1>{country.name?.common}</h1>
            <img src={country.flags?.png} alt={country.name?.common} width="200" />
            <p><strong>Capital: </strong>{country.capital?.[0] ?? "N/A"}</p>
            <p><strong>Region: </strong>{country.region}</p>
            <p><strong>Population: </strong>{country.population?.toLocaleString()}</p>
        </div>
    );
}
