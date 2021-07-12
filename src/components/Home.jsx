import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Results } from "./Results";

const StyledHome = styled.div`
  padding: 1.5rem;
  @media screen and (min-width: 640px) {
    padding: 1.5rem 2.5rem 0;
  }
  @media screen and (min-width: 1440px) {
    padding: 0 5rem;
  }
  @media screen and (min-width: 1920px) {
    padding: 0 10rem;
  }
  .form-wrapper {
    margin-top: 7rem;
    @media screen and (min-width: 1024px) {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
    }
    @media screen and (min-width: 1440px) {
      margin-top: 10rem;
    }
    form {
      padding: 1.5rem 3rem;
      background-color: var(--els);
      display: flex;
      align-items: center;
      border-radius: 5px;
      box-shadow: 0 2px 5px #0000001a;
      @media screen and (min-width: 1024px) {
        width: 100%;
        margin-right: 5rem;
      }
      @media screen and (min-width: 1440px) {
        width: 37%;
        margin: 0;
      }
      .search-icon path {
        fill: var(--input);
      }
      .country-input {
        width: 100%;
        margin-left: 2rem;
        font-size: inherit;
      }
    }
    .select-wrapper {
      width: 55%;
      position: relative;
      margin-top: 2rem;
      background-color: var(--els);
      border-radius: 5px;
      box-shadow: 0 2px 5px #0000001a;
      &::before {
        position: absolute;
        top: 50%;
        right: 1.5rem;
        transform: translateY(-50%);
        content: "▼";
        font-size: 0.6rem;
        z-index: 1;
      }
      @media screen and (min-width: 1024px) {
        margin: 0;
        width: 30%;
      }
      @media screen and (min-width: 1440px) {
        width: 20%;
      }
      .country-filter {
        width: 100%;
        background-color: var(--els);
        padding: 1.5rem;
        border-radius: 5px;
      }
    }
  }
`;

export const Home = () => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [allCountries, setAllCountries] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`https://restcountries.eu/rest/v2/all`);
    const json = await res.json();

    setAllCountries(json);
    setFetchedData(json);
  };

  const filterCountry = async () => {
    setFetchedData(null);

    if (country === "") {
      fetchData();
    } else {
      const filteredData = allCountries.filter((data) =>
        data.name.toLowerCase().includes(country.toLowerCase())
      );

      setFetchedData(filteredData);
    }
  };

  const filterRegion = async () => {
    setFetchedData(null);

    if (region === "") {
      fetchData();
    } else {
      const filteredData = allCountries.filter(
        (data) => data.region === region
      );

      setFetchedData(filteredData);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (region === "") {
      setFetchedData(allCountries);
    } else {
      filterRegion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, allCountries]);

  return (
    <>
      <StyledHome>
        <div className="form-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              filterCountry();
            }}
          >
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="country-input"
              placeholder="Search for a country..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </form>
          <div className="select-wrapper">
            <select
              name="country-filter"
              id="country-filter"
              className="country-filter"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              onBlur={(e) => setRegion(e.target.value)}
            >
              <option value="">Filter by region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
      </StyledHome>
      <Results countryData={fetchedData} />
    </>
  );
};
