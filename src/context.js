import React from "react";

// import Tshirt from "app/assets/product/tshirt.jpg";
// import Lekbong from "app/assets/product/lekbong.jpg";
// import Denim from "app/assets/product/denim.jpg";
// import ShortPants from "app/assets/product/short-pants.jpg";
// import LandingBanner from "app/assets/banner/landing-banner.jpg";
// import YouthwayLogo from "app/assets/logo/youthway-logo.png";

const Context = React.createContext();

const initialState = {
  landing: {
    datas: []
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "landing":
      return {
        ...state,
        landing: action.data
      };
    default:
      console.log("error case reducer on root context");
      throw new Error();
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
