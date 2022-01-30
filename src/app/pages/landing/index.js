import React from "react"
import './styles.scss'
// import moment from 'moment'
// import { useSelector } from "react-redux"
// import { doneTodo, undoneTodo, deleteTodo, fetchAllTodo } from "redux/actions/Todos"
import axiosInstance from "config/services"
import { NavLink } from "react-router-dom"
import { Spinner, Button } from "react-bootstrap"

const Landing = ({ state, dispatch }) => {
  // const store = useSelector(state => state)

  const [pokemon, setPokemon] = React.useState({
    next: '',
    list: [],
    loading: true,
  })
  const [loadingLoadMore, setLoadingLoadMore] = React.useState(false)
  // const [ownedTotal, setOwnedTotal] = React.useState(0)

  React.useEffect(() => {
    onFetchAllPokemon()
  }, [])

  async function onFetchAllPokemon() {
    try {
      setPokemon({
        ...pokemon,
        loading: true,
      })
      const res = await axiosInstance.get("/pokemon?limit=10&offset=0")

      const filtered = res.data.results.map((poke) => {
        const splitted = poke.url.split("/")
        const pokeId = splitted[splitted.length - 2]
        return ({
          ...poke,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
        })
      })
      
      setPokemon({
        next: res.data.next,
        list: filtered,
        loading: false
      })
    } catch (error) {
      setPokemon({
        ...pokemon,
        loading: false,
      })
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
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
        })
      })
      
      setPokemon({
        next: res.data.next,
        list: [
          ...pokemon.list,
          ...filtered
        ],
        loading: false
      })
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
      <span className="list mb-4">
        {
          pokemon.list.length > 0 && (
            pokemon.list.map((data, key) => (
              <NavLink to={`/${key+1}`} onClick={onCardClicked} key={key}>
              <div className="card" >
                <div className="card-content">
                  <div className="content">
                    {/* <img src={data.sprites.front_default} alt={data.name} /> */}
                    <img src={data.image} alt={data.name} />
                  </div>
                </div>
                <footer className="card-footer">
                  <p className="card-footer-title">
                    { data.name }
                  </p>
                </footer>
              </div>
              </NavLink>
            ))
          )
        }
      </span>
      { pokemon.list.length === 0 && !pokemon.loading && <div className="empty-message">To Do list is Empty!</div> }
      { 
        pokemon.list.length > 0 && (
          <div className="d-grid">
            <Button 
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
