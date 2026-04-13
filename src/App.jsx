import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CountryDetail from "./pages/CountryDetail"
import HomeWithHook from "./pages/HomeWithHook"
import CountryDetailWithHook from "./pages/CountryDetailWithHook"
import Notfound from "./pages/NotFound"

function App(){
  return (
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/country/:code" element = {<CountryDetail />} />

        <Route path="/hook" element={<HomeWithHook />} />
        <Route path="/hook/country/:code" element={<CountryDetailWithHook />} />

        <Route path="*" element = {<Notfound />} />
      </Routes>
  );
}


export default App;
