export default function Card({ countries }) {
  return (
    <div className="row mt-5 g-3 d-flex justify-content-center align-items-center">
      {countries.map((country) => (
        <div className="col-sm-12 col-md-4" key={country.cca3}>
          <div className="card w-100">
            <img
              src={country.flags?.png}
              className="card-img-top"
              alt={country.name?.common}
            />
            <div className="card-body">
              <h4 className="card-title">{country.name?.common}</h4>
              <h5 className="card-text">{country.region}</h5>
              <span>Population: {country.population.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
