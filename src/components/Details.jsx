import styled from "styled-components";
import iso from "iso-3166-1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledDetails = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 10rem 2.5rem 2.5rem;
  @media screen and (min-width: 1440px) {
    padding: 10rem 5rem 2.5rem;
  }
  @media screen and (min-width: 1920px) {
    padding: 10rem 10rem 5rem;
  }
  p span {
    font-weight: 300;
  }
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .back {
    display: inline-block;
    background-color: var(--els);
    padding: 0.5rem 2rem;
    border-radius: 5px;
    box-shadow: 0 2px 5px #0000001a;
    .back-icon {
      margin-right: 0.5rem;
    }
  }
  .country-details-container {
    @media screen and (min-width: 1024px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 5rem;
      margin-top: 3rem;
      align-items: center;
    }
    @media screen and (min-width: 1280px) {
      column-gap: 10rem;
    }
    .country-flag {
      margin-top: 4rem;
      @media screen and (min-width: 1024px) {
        margin: 0;
      }
    }
    .country-details {
      margin-top: 3rem;
      @media screen and (min-width: 1024px) {
        margin: 0;
      }
      .details-container {
        margin-top: 1.5rem;
        @media screen and (min-width: 1024px) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 2rem;
        }
        .second-details {
          margin-top: 2rem;
          @media screen and (min-width: 1024px) {
            margin: 0;
          }
        }
      }
      .border-countries {
        margin-top: 2rem;
        @media screen and (min-width: 1280px) {
          display: flex;
        }
        .border-countries-heading {
          white-space: nowrap;
          margin-top: 0.35rem;
        }
        .border-countries-container {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          @media screen and (min-width: 1280px) {
            margin: 0 0 0 2rem;
          }
          .border-country {
            display: block;
            margin: 0.25rem 0.5rem 0.25rem 0;
            padding: 0.25rem 1rem;
            background-color: var(--els);
            border-radius: 5px;
            box-shadow: 0 0 5px #0000001a;
            font-weight: 300;
          }
        }
      }
    }
  }
`;

export const Details = () => {
  const { alpha3Code } = useParams();
  const [fetchedData, setFetchedData] = useState(null);

  const fetchData = async () => {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
    );
    const json = await res.json();

    setFetchedData(json);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledDetails>
      {!fetchedData ? (
        <h1 className="no-data">Fetching data...</h1>
      ) : (
        <>
          <NavLink exact to="/" className="back">
            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
            Back
          </NavLink>
          <div className="country-details-container">
            <div className="country-flag">
              <img src={fetchedData.flag} alt={`${fetchedData.name} flag`} />
            </div>
            <div className="country-details">
              <h1 className="name">{fetchedData.name}</h1>
              <div className="details-container">
                <div className="first-details details">
                  <p className="native-name">
                    Native Name: <span>{fetchedData.nativeName}</span>
                  </p>
                  <p className="population">
                    Population:{" "}
                    <span>{fetchedData.population.toLocaleString()}</span>
                  </p>
                  <p className="region">
                    Region: <span>{fetchedData.region}</span>
                  </p>
                  <p className="sub-region">
                    Sub Region: <span>{fetchedData.subregion}</span>
                  </p>
                  <p className="capital">
                    Capital: <span>{fetchedData.capital}</span>
                  </p>
                </div>
                <div className="second-details details">
                  <p className="top-level-domain">
                    Top Level Domain: <span>{fetchedData.topLevelDomain}</span>
                  </p>
                  <p className="currencies">
                    Currencies: <span>{fetchedData.currencies[0].name}</span>
                  </p>
                  <p className="languages">
                    Languages:{" "}
                    <span>
                      {fetchedData.languages.map((lang, i) => {
                        if (i === fetchedData.languages.length - 1) {
                          return lang.name;
                        }

                        return `${lang.name}, `;
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <div className="border-countries">
                <h3 className="border-countries-heading">Border countries:</h3>
                <div className="border-countries-container">
                  {fetchedData.borders.length ? (
                    fetchedData.borders.map((border) => {
                      const name = iso.whereAlpha3(border);

                      return name ? (
                        <NavLink
                          exact
                          to={`/${border}`}
                          className="border-country"
                          key={border}
                        >
                          {name.country}
                        </NavLink>
                      ) : (
                        ""
                      );
                    })
                  ) : (
                    <span className="no-border border-country">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </StyledDetails>
  );
};
