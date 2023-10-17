import React, { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cityname, setCityname] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [postalcode, setPostalcode] = useState("");
  const [weight, setWeight] = useState("");
  const [courier, setCourier] = useState([]);
  const [results, setResults] = useState([]);

  const baseurl = "http://localhost:3000/api/";

  useEffect(() => {
    handleCity();
    handleProvinces();
  }, []);
  const handleCheckOngkir = async () => {
    try {
      const response = await axios.post(`${baseurl}cost`, {
        origin: origin,
        destination: destination,
        weight: weight,
        courier: courier,
      });
  
      setResults(response.data.rajaongkir.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCity = async () => {
    try {
      const response = await axios.get(`${baseurl}city`);
      setCityname(response.data.rajaongkir.results);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleProvinces = async () => {
    try {
      const response = await axios.get(`${baseurl}province`);
      setProvinces(response.data.rajaongkir.results);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <div>
        <label htmlFor="cityname">City Name</label>
        <select multiple={false} value={cityname}
          onChange={(e) => setOrigin(e.target.value)}
        >
          <option value="">Select a city</option>
          {cityname.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="provinces">Provinces</label>
        <select multiple={false} value={destination}
        
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="">Select a province</option>
          {provinces.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="postalcode">Postal Code</label>
        <input
          type="text"
          id="postalcode"
          value={postalcode}
          onChange={(e) => setPostalcode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="weight">Weight</label>
        <input
          type="text"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div>
  <label htmlFor="courier">Courier</label>
  <select value={courier} onChange={(e) => setCourier(e.target.value)}>
    <option value="">Select a courier</option>
    {Array.isArray(courier) && courier.map((c) => (
      <option key={c.courier_name} value={c.courier_name}>
        {c.courier_name}
      </option>
    ))}
  </select>
</div>

      <button onClick={handleCheckOngkir}>Check Ongkir</button>
      {results.length > 0 && (
        <div>
          {results.map((result) => (
            <div key={result.code}>
              <h3>{result.name}</h3>
              <ul>
                {result.costs.map((cost) => (
                  <li key={cost.service}>
                    {cost.description} - {cost.cost[0].value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
