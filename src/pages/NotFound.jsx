import { Link } from "react-router-dom"

export default function NotFound(){
    return (
        <div>
            <h1>404 - Sayfa Bulunamadi</h1>
            <p> There is no such kind of pages</p>
            <Link to = "/">Return the main pages</Link>
        </div>
    );
}
