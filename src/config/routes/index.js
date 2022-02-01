import React from "react";
import { Route, Switch, withRouter, useLocation } from "react-router-dom";
import "./styles.scss";

const Header = React.lazy(() => import("app/components/header"))
const Landing = React.lazy(() => import("app/pages/landing"))
const Detail = React.lazy(() => import("app/pages/detail"))
const PokemonList = React.lazy(() => import("app/pages/pokemon-list"))

const Routes = ({ state, dispatch }) => {
  const location = useLocation();
  return (
    <React.Suspense fallback={null}>
      <Header state={state} dispatch={dispatch} location={location} />
      <main className="main-content">
        <Switch>
          <Route
            path="/my-pokemon"
            component={(props) => (
              <PokemonList {...props} state={state} dispatch={dispatch} />
            )}
          />
          <Route
            path="/:pokemonId"
            component={(props) => (
              <Detail {...props} state={state} dispatch={dispatch} />
            )}
          />
          <Route
            path="/"
            component={(props) => (
              <Landing {...props} state={state} dispatch={dispatch} />
            )}
          />
        </Switch>
      </main>
    </React.Suspense>
  );
};

export default withRouter(Routes);
