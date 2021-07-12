import styled, { ThemeProvider } from "styled-components";
import { Switch, Route, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { light, dark } from "./components/Themes";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Home } from "./components/Home";
import { Details } from "./components/Details";

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--els);
  width: 100%;
  padding: 2.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px #0000001a;
  @media screen and (min-width: 640px) {
    padding: 2.5rem;
  }
  @media screen and (min-width: 1440px) {
    padding: 2rem 5rem;
  }
  @media screen and (min-width: 1920px) {
    padding: 2rem 10rem;
  }
  .logo {
    font-weight: 800;
    font-size: 1.125rem;
    @media screen and (min-width: 1440px) {
      font-size: 1.5rem;
    }
  }
  .theme-toggle {
    @media screen and (min-width: 1440px) {
      font-size: 1rem;
    }
    .theme-icon {
      margin-right: 0.5rem;
    }
  }
`;

export const App = () => {
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <StyledNav>
        <NavLink exact to="/" className="logo">
          Where in the world?
        </NavLink>
        <button className="theme-toggle" onClick={toggleTheme}>
          <FontAwesomeIcon
            icon={theme === "light" ? faMoon : faSun}
            className="theme-icon"
          />
          {theme === "light" ? "Dark" : "Light"} mode
        </button>
      </StyledNav>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:alpha3Code">
          <Details />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};
