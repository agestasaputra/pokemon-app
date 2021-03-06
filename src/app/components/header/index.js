import React from 'react'
import './index.scss'
import { NavLink, useHistory } from "react-router-dom";

const Header = ({ state, dispatch, location }) => {
  const history = useHistory()

  function onBackClicked() {
    dispatch({
      type: "header",
      data: {
        ...state.header,
        title: 'Pokemon App'
      }
    });
    history.goBack()
  }

  function onMyPokemonClicked() {
    dispatch({
      type: "header",
      data: {
        ...state.header,
        title: 'My Pokemon'
      }
    });
  }

  return (
    <nav>
      <div className="container-navbar">
        <div className="container-navbar__icon-left">
          {
            location.pathname !== '/' && (
              <i className="fa fa-lg fa-arrow-circle-left" onClick={onBackClicked} />
            )
          }
        </div>
        <div className="container-navbar__title">
          <strong>{ state.header.title }</strong>
        </div>
        <div className="container-navbar__icon-right">
          {
            location.pathname !== '/create' && (
              <NavLink to={"/my-pokemon"} onClick={onMyPokemonClicked}>
                <img src={process.env.PUBLIC_URL + '/pokeball.ico'} alt="pokeball" />
              </NavLink>
            )
          }
        </div>
      </div>
    </nav>
  )
}


export default Header;