import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";


function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputText = search.trim();

  useEffect(() => {
    let url;
    if (inputText) {
      url = `https://restcountries.com/v3.1/name/${encodeURIComponent(inputText)}?fields=name,flags,region,population,cca3`;
    } else if (region !== "all") {
      url = `https://restcountries.com/v3.1/region/${region}?fields=name,flags,region,population,cca3`;
    } else {
      url = "https://restcountries.com/v3.1/all?fields=name,flags,region,population,cca3";
    }

    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("No countries found");
        }

        const data = await res.json();
        console.log("Fetched countries:", data); 
        setCountries(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch countries");
          setCountries([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [search, region]);

  return (
    <div className="container pt-5">
      <SearchBar
        region={region}
        setRegion={setRegion}
        search={search}
        setSearch={setSearch}
      />

      {loading && <p className="mt-4">Loading countries...</p>}

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          <strong>Oops:</strong> {error}
        </div>
      )}

      {!loading && !error && countries.length === 0 && (
        <div className="glass rounded-4 p-4 mt-4">
          <div className="h5 mb-1">No results</div>
          <div className="muted">
            Try searching something else (e.g., Iran, Germany).
          </div>
        </div>
      )}

      {!loading && !error && countries.length > 0 && (
        <Card countries={countries} />
      )}
    </div>
  );
}

export default App;
