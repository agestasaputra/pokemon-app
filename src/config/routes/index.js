import React from "react";
import { Route, Switch, withRouter, useLocation } from "react-router-dom";
import Header from "app/components/header";
// import Footer from "app/components/footer";
import Landing from "app/pages/landing";
import Create from "app/pages/create";
import Detail from "app/pages/detail";
import PokemonList from "app/pages/pokemon-list";
import "./styles.scss";

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
            path="/create"
            component={(props) => (
              <Create {...props} state={state} dispatch={dispatch} />
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
      {/* <Footer state={state} dispatch={dispatch} location={location} /> */}
    </React.Suspense>
  );
};

export default withRouter(Routes);
