import React from "react"
import './styles.scss'
import axiosInstance from "config/services"
import { Spinner, Button } from "react-bootstrap"
import Card from "app/components/Card"

const Landing = ({ state, dispatch }) => {

  const [pokemon, setPokemon] = React.useState({
    next: '',
    list: [],
    loading: false,
  })
  const [loadingLoadMore, setLoadingLoadMore] = React.useState(false)

  React.useEffect(() => {
    onFetchAllPokemon()
  }, [])

  async function onFetchAllPokemon() {
    try {
      setPokemon(prevState => ({
        ...prevState,
        loading: true,
      }))
      const res = await axiosInstance.get("/pokemon?limit=20&offset=0")

      const filtered = res.data.results.map((poke) => {
        const splitted = poke.url.split("/")
        const pokeId = splitted[splitted.length - 2]
        return ({
          ...poke,
          customName: '',
          id: Number(pokeId),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`,
          owned: 0
        })
      })
      let listResult = []
      
      if (localStorage.getItem("pokemon")) {
        const dataLocalStorage = JSON.parse(localStorage.getItem("pokemon"))
        const updateOwned = filtered.map((item) => {
          let result = {...item};
          const founded = dataLocalStorage.filter((itemLocalStorage) => itemLocalStorage.id === item.id)
          if (founded && founded !== -1) {
            result.owned = founded.length
          }
          return result;
        })
        listResult = updateOwned
      } else {
        listResult = filtered
      }

      setPokemon(prevState => ({
        ...prevState,
        next: res.data.next,
        list: listResult,
        loading: false
      }))
    } catch (error) {
      setPokemon(prevState => ({
        ...prevState,
        loading: false,
      }))
      alert(`Error - ${error.message}`)
      throw error
    }
  }

  async function onFetchMorePokemon() {
    try {
      setLoadingLoadMore(true)
      const params = pokemon.next.split("v2")[1];
      const res = await axiosInstance.get(`${params}`)

      const filtered = res.data.results.map((poke) => {
        const splitted = poke.url.split("/")
        const pokeId = splitted[splitted.length - 2]
        return ({
          ...poke,
          customName: '',
          id: Number(pokeId),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`,
          owned: 0
        })
      })
      let listResult = []

      if (localStorage.getItem("pokemon")) {
        const dataLocalStorage = JSON.parse(localStorage.getItem("pokemon"))
        const updateOwned = filtered.map((item) => {
          let result = {...item};
          const founded = dataLocalStorage.filter((itemLocalStorage) => itemLocalStorage.id === item.id)
          if (founded && founded !== -1) {
            result.owned = founded.length
          }
          return result;
        })
        listResult = updateOwned
      } else {
        listResult = filtered
      }
      
      setPokemon(prevState => ({
        ...prevState,
        next: res.data.next,
        list: [
          ...pokemon.list,
          ...listResult
        ],
        loading: false
      }))
      setLoadingLoadMore(false)
    } catch (error) {
      alert(`Error - ${error.message}`)
      setLoadingLoadMore(false)
      throw error
    }
  }

  function onCardClicked() {
    dispatch({
      type: "header",
      data: {
        ...state.header,
        title: 'Pokemon Detail'
      }
    });
  }

  return (
    <div className="container-landing">
      { 
        pokemon.loading && (
          <div className="loading-section text-center">
            <Spinner animation="border" variant="warning" />
          </div>
        ) 
      }
      <span className="list mb-3">
        {
          pokemon.list.length > 0 && (
            <Card pokemon={pokemon} onCardClicked={onCardClicked} />
          )
        }
      </span>
      { pokemon.list.length === 0 && !pokemon.loading && <div className="empty-message">To Do list is Empty!</div> }
      { 
        pokemon.list.length > 0 && (
          <div className="d-grid">
            <Button 
              data-testid="buttonLoadMore"
              variant="primary" 
              size="block"
              disabled={loadingLoadMore}
              onClick={onFetchMorePokemon}
            >
              {
                loadingLoadMore ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <React.Fragment>Load more</React.Fragment>
                )
              }
            </Button>
          </div>
        ) 
      }   
    </div>
  )
}

export default Landing
