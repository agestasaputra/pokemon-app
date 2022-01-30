import React from 'react'
import './index.scss'
import { NavLink } from "react-router-dom";

const Header = ({ state, dispatch, location }) => {
  // console.log("location:", location);
  // console.log("window.location.href:", window.location.href);
  // console.log("window.location.pathname:", window.location.pathname);

  function onBackClicked() {
    dispatch({
      type: "header",
      data: {
        ...state.header,
        title: 'Pokemon App'
      }
    });
  }

  return (
    <nav>
      <div className="container-navbar">
        <div className="container-navbar__icon-left">
          {
            !(location.pathname === '/' || location.pathname === '/pokemon-app/') && (
              <NavLink to={"/"} onClick={onBackClicked}>
                <i className="fa fa-arrow-circle-left" />
              </NavLink>
            )
          }
        </div>
        <div className="container-navbar__title">
          <strong>{ state.header.title }</strong>
        </div>
        <div className="container-navbar__icon-right">
          {
            location.pathname !== '/create' && (
              <NavLink to={"/create"}>
                <i className="fa fa-plus-circle" />
              </NavLink>
            )
          }
        </div>
      </div>
    </nav>
  )
}


export default Header;