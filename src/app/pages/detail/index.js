import React from "react"
import axiosInstance from "config/services"
import './styles.scss'

const Detail = ({ location }) => {

  const [pokemon, setPokemon] = React.useState({
    data: {},
    loading: true
  })

  React.useEffect(() => {
    console.log('pokemon:', pokemon)
  }, [pokemon])

  React.useEffect(() => {
    onFetchDetailPokemon()
  }, [])

  async function onFetchDetailPokemon(data, from) {
    try {
      console.log('location:', location);
      const res = await axiosInstance.get(`/pokemon${location.pathname}`);
      setPokemon({
        ...pokemon,
        data: res.data
      })
    } catch (error) {
      alert(`Error - ${error.message}`)
      setPokemon({
        ...pokemon,
        loading: false
      })
      throw error;
    }
  }

  return (
    <div className="container-detail">  
      { Object.keys(pokemon.data).length === 0 && <progress className="progress is-small is-primary" max="100" /> }
      {
        Object.keys(pokemon.data).length > 0 && (
          <React.Fragment>
            <div className="info-img">
              <img src={pokemon.data.sprites.front_default} alt={pokemon.data.name} />
            </div>
            <div className="info-stats">
              <div className="info-stats__title">
                Statistics
              </div>
              <div className="info-stats__detail">
                {
                  pokemon.data.stats.length > 0 ? pokemon.data.stats.map((poke, key) => (
                    <React.Fragment key={key}>
                        <span className="info-stats__detail-title">
                          <span>
                          { poke.stat.name }
                          </span>
                          <span>
                          { poke.base_stat }
                          </span>
                        </span>
                        <progress className="progress" value={ poke.base_stat } max="200" />
                      </React.Fragment>
                  )) : (
                    <div> Empty Statistics! </div>
                  )
                }
              </div>
            </div>
          </React.Fragment>
        )
      }
    </div>

  )
}

export default Detail
