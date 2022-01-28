import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "config/routes";
import { Context, Provider } from "./context";

function MainContent() {
  const { state, dispatch } = React.useContext(Context);
  return (
    <BrowserRouter>
      <Routes state={state} dispatch={dispatch} />
    </BrowserRouter>
  );
}

const App = () => (
  <Provider>
    <MainContent />
  </Provider>
);
export default App;
