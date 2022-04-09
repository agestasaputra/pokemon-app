import React from 'react';
import { create } from 'react-test-renderer'
import Card from './index'
import { BrowserRouter } from "react-router-dom";

test("renders when there is one item", () => {
  const pokemon = {
    list: [
      {
        customName: "",
        id: 1,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        name: "bulbasaur",
        owned: 0,
        url: "https://pokeapi.co/api/v2/pokemon/1/"
      }
    ],
    loading: false,
    next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
  }
  const tree = create(
    <BrowserRouter>
      <Card pokemon={pokemon} />
    </BrowserRouter>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})