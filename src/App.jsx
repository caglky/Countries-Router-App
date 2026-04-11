import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CountryDetail from "./pages/CountryDetail"
import Notfound from "./pages/NotFound"

function App(){
  return (
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/country/:code" element = {<CountryDetail />} />
      <Route path="*" element = {<Notfound />} />
    </Routes>
  );
}

export default App;

