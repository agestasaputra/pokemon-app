import React from 'react'
import { NavLink } from "react-router-dom"

export default function Card({ pokemon, onCardClicked }) {
  return (
    <>
      {
        pokemon.list.map((data, key) => (
          <NavLink to={`/${key+1}`} onClick={onCardClicked} key={key}>
            <div className="card" >
              <div className="card-info">
                <h6 className="card-info__title">
                  { data.name }
                </h6>
                <p className="card-desc">
                  Owned: <strong>{ data.owned }</strong>
                </p>
              </div>
              <img src={data.image} alt={data.name} />
            </div>
          </NavLink>
        ))
      }
    </>
  )
}
