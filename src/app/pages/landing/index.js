import React from "react"
import './styles.scss'
// import moment from 'moment'
// import { useSelector } from "react-redux"
// import { doneTodo, undoneTodo, deleteTodo, fetchAllTodo } from "redux/actions/Todos"
import axiosInstance from "config/services"
import { NavLink } from "react-router-dom"

const Landing = ({ state, dispatch }) => {
  // const store = useSelector(state => state)

  const [pokemon, setPokemon] = React.useState({
    next: '',
    list: [],
    loading: true,
  })
  const [loadingLoadMore, setLoadingLoadMore] = React.useState(false)
  const [ownedTotal, setOwnedTotal] = React.useState(0)

  React.useEffect(() => {
    onFetchAllPokemon()
  }, [])

  async function onFetchAllPokemon() {
    try {
      setPokemon({
        ...pokemon,
        loading: true,
      })
      await axiosInstance.get("/pokemon?limit=10&offset=0")
        .then((res) => {
          const pokemon = {
            loading: true,
            next: res.data.next,
            list: res.data.results,
          }
          onFetchDetailPokemon(pokemon, "onFetchAllPokemon")
        })  
        .catch(err => {
          throw err
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

  async function onFetchDetailPokemon(data, from) {
    try {
      setPokemon({
        ...pokemon,
        loading: from === "onFetchAllPokemon" ? true : false,
      })
      let promises = []
      for (const item of data.list) {
        const params = item.url.split("v2")[1];
        const { data: sprites } = await axiosInstance.get(`${params}`)
        promises.push(sprites);
      }

      await Promise.all(promises)
        .then((res) => {
          let pokemonTemp = [...data.list];
          res.forEach((item, index) => {
            const findIndex = pokemonTemp.findIndex((pok) => item.name === pok.name)
            pokemonTemp[findIndex].sprites = item.sprites
          })
          setPokemon({
            ...data,
            next: data.next,
            list: [...pokemon.list, ...pokemonTemp],
            loading: false
          })
          setLoadingLoadMore(false)
        })
        .catch(err => {
          throw err
        })
    } catch (error) {
      alert(`Error - ${error.message}`)
      setPokemon({
        ...pokemon,
        loading: false,
      })
      setLoadingLoadMore(false)
      throw error
    }
  }

  async function onFetchMorePokemon() {
    try {
      setLoadingLoadMore(true)
      const params = pokemon.next.split("v2")[1];
      await axiosInstance.get(`${params}`)
        .then((res) => {
          const pokemon = {
            loading: false,
            next: res.data.next,
            list: res.data.results,
          }
          onFetchDetailPokemon(pokemon, "onFetchMorePokemon")
        })
        .catch(err => {
          throw err
        })
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
      { pokemon.loading && <progress className="progress is-small is-primary" max="100">80%</progress> }
      <span className="list mb-5">
        {
          pokemon.list.length > 0 && (
            pokemon.list.map((data, key) => (
              <NavLink to={`/${key+1}`} onClick={onCardClicked} key={key}>
              <div className="card" >
                <div className="card-content">
                  <div className="content">
                    <img src={data.sprites.front_default} alt={data.name} />
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
      { pokemon.list.length > 0 && <button className={`button is-fullwidth is-success ${loadingLoadMore && 'is-loading'}`} onClick={onFetchMorePokemon}>Load more</button> }   
    </div>

  )
}

export default Landing
