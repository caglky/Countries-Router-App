import { Link } from "react-router-dom"

export default function NotFound(){
    return (
        <div>
            <h1>404 - Sayfa Bulunamadi Sayfada Hata var route değiştiriniz !</h1>
            <p> There is no such kind of pages conflict yemek için ekliyorum</p>
            <Link to = "/">Return the main pages</Link>
        </div>
    );
}
