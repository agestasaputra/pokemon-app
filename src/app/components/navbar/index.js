import React from 'react'
import './index.scss'
import { NavLink } from "react-router-dom";

const Navbar = ({ state, location }) => {
  console.log("location:", location);
  console.log("window.location.href:", window.location.href);
  console.log("window.location.pathname:", window.location.pathname);
  return (
    <nav>
      <div className="container-navbar">
        <div className="container-navbar__icon-left">
          {
            !(location.pathname === '/' || location.pathname === '/todo-app/') && (
              <NavLink to={"/"}>
                <i className="fa fa-arrow-circle-left" />
              </NavLink>
            )
          }
        </div>
        <div className="container-navbar__title">
          <strong>Pokemon App</strong>
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


export default Navbar;