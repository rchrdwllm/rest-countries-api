import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledResults = styled.section`
  margin-top: 2rem;
  padding: 0 2.5rem;
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1.5rem;
    row-gap: 3rem;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 0 2.5rem 2.5rem;
  }
  @media screen and (min-width: 1440px) {
    margin-top: 4rem;
    padding: 0 5rem 5rem;
    gap: 4rem;
  }
  @media screen and (min-width: 1920px) {
    padding: 0 10rem 5rem;
  }
  &.no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem 0;
    h1 {
      color: var(--input);
    }
  }
  .fetching-data-card {
    background-color: var(--els);
    border-radius: 5px;
    box-shadow: 0 2px 5px #0000001a;
    padding: 2.5rem;
    .fetching-data {
      text-align: center;
    }
  }
  .country-card {
    display: block;
    margin-bottom: 3rem;
    background-color: var(--els);
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 2px 5px #0000001a;
    @media screen and (min-width: 1024px) {
      margin: 0;
    }
    .country-img {
      @media screen and (min-width: 1024px) {
        height: 120px;
      }
      @media screen and (min-width: 1440px) {
        height: 175px;
      }
      img {
        height: 100%;
        object-fit: cover;
        box-shadow: 0 2px 5px #0000000a;
      }
    }
    .country-details {
      padding: 1.5rem 1.5rem 2.5rem;
      .other-details {
        margin-top: 1rem;
        font-size: 0.875rem;
        p span {
          font-weight: 300;
        }
      }
    }
  }
`;

export const Results = ({ countryData }) => {
  if (countryData) {
    if (!countryData.length) {
      return (
        <StyledResults className="no-data">
          <h1>No country found!</h1>
        </StyledResults>
      );
    }
  }

  if (!countryData) {
    return (
      <StyledResults className="no-data">
        <h1>Hang on, fetching country data!</h1>
      </StyledResults>
    );
  }

  return (
    <StyledResults>
      {countryData.map((data, i) => (
        <NavLink
          exact
          to={`/${data.alpha3Code}`}
          className="country-card"
          key={i}
        >
          <div className="country-img">
            <img src={data.flag} alt={`${data.name}`} />
          </div>
          <div className="country-details">
            <h3 className="name">{data.name}</h3>
            <div className="other-details">
              <p className="population">
                Population: <span>{data.population.toLocaleString()}</span>
              </p>
              <p className="region">
                Region: <span>{data.region}</span>
              </p>
              <p className="capital">
                Capital: <span>{data.capital}</span>
              </p>
            </div>
          </div>
        </NavLink>
      ))}
    </StyledResults>
  );
};
