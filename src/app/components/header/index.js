import React from 'react'
import './index.scss'
import { NavLink, /* useHistory */ } from "react-router-dom";

const Header = ({ state, dispatch, location }) => {
  // const history = useHistory()

  // function onBackClicked() {
  //   dispatch({
  //     type: "header",
  //     data: {
  //       ...state.header,
  //       title: 'Pokemon App'
  //     }
  //   });
  //   history.goBack()
  // }

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
          {/* {
            !(location.pathname === '/' || location.pathname === '/pokemon-app/') && (
              <i className="fa fa-lg fa-arrow-circle-left" onClick={onBackClicked} />
            )
          } */}
          <NavLink to={"/"} onClick={onMyPokemonClicked}>
            <i className="fa fa-2x fa-home" />
          </NavLink>
        </div>
        <div className="container-navbar__title">
          {/* <NavLink to={"/"} onClick={onMyPokemonClicked}> */}
          <strong>{ state.header.title }</strong>
          {/* </NavLink> */}
        </div>
        <div className="container-navbar__icon-right">
          {
            location.pathname !== '/create' && (
              <NavLink to={"/my-pokemon"} onClick={onMyPokemonClicked}>
                {/* <i className="fa fa-lg fa-heart" /> */}
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