export default function SearchBar({ search, setSearch, region, setRegion }) {
  const regions = ["all", "Africa", "Asia", "Americas", "Europe", "Oceania"];

  return (
    <div className="searchPart rounded-4 p-5">
      <div className="row g-3 align-items-center">
        <div className="col-sm-6">
          <div className="input-group">
            <span className="input-group-text">Search</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search a country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6">
          <select
            className="form-select"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regions.map((reg) => (
              <option value={reg} key={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
