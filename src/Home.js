import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cityname, setCityname] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [postalcode, setPostalcode] = useState("");
  const [weight, setWeight] = useState("");
  const [courier, setCourier] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    handleCity();
    handleProvinces();
  }, []);

  const handleCheckOngkir = async () => {
    try {
      const response = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        {
          origin: origin,
          destination: destination,
          weight: weight,
          courier: courier,
        },
        {
          headers: {
            key: "aac75978ddf338dc5d0c08f76b7161b3",
          },
        }
      );

      setResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCity = async () => {
    try {
      const response = await axios.get("/api/city"); 
      setCityname(response.data.rajaongkir.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProvinces = async () => {
    try {
      const response = await axios.get(
        "https://api.rajaongkir.com/starter/province",
        {
          headers: {
            key: "aac75978ddf338dc5d0c08f76b7161b3",
          },
        }
      );

      setProvinces(response.data.rajaongkir.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="cityname">City Name</label>
        <select
  id="cityname"
  value={origin}  
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
        <select
          id="provinces"
          value={provinces}
          onChange={(e) => setProvinces(e.target.value)}
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
        <input
          type="text"
          id="courier"
          value={courier}
          onChange={(e) => setCourier(e.target.value)}
        />
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
