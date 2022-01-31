import React from "react"
import './styles.scss'
// import axiosInstance from "config/services"
import { NavLink } from "react-router-dom"
import { Spinner, Badge, Button } from "react-bootstrap"

const PokemonList = ({ state, dispatch }) => {
  const [pokemon, setPokemon] = React.useState({
    next: '',
    list: [],
    loading: true,
  })
  // const [modal, setModal] = React.useState({
  //   show: false,
  //   loading: false
  // });

  React.useEffect(() => {
    onLocalStorageChecked();
  }, [])

  function onLocalStorageChecked() {
    const data = localStorage.getItem("pokemon");
    setPokemon({
      ...pokemon,
      list: JSON.parse(data) || [],
      loading: false
    })
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

  function onTrashClicked(data) {
    console.log("onTrashClicked - data:", data)
  }

  return (
    <div className="container-my-pokemon">
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
              <div className="card" key={key}>
                  <div className="card-content">
                    <div className="content">
                      <img src={data.sprites.front_default} alt={data.name} />
                    </div>
                  </div>
                <footer className="card-footer">
                  <p className="card-footer-title">
                    <span>
                      { data.customName } 
                    </span>
                    <span>
                      <Badge pill bg="success">
                        { data.name }
                      </Badge>
                    </span>
                  </p>
                  <div className="button-container mt-2">
                    
                    <NavLink to={`/${data.id}`} onClick={onCardClicked}>
                      <Button 
                        variant="primary" 
                      >
                        <i className="fa fa-info-circle" />
                      </Button>
                    </NavLink>
                    <Button 
                      variant="danger" 
                    >
                      <i className="fa fa-trash" onClick={() => onTrashClicked(data)}/>
                    </Button>
                  </div>
                </footer>
              </div>
            ))
          )
        }
      </span>
      { pokemon.list.length === 0 && !pokemon.loading && <div className="empty-message">My Pokemon list is Empty!</div> }  

       {/* <Modal.Footer>
          <Button variant="secondary" disabled={modal.loading} onClick={onModalClosed}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={form.name.length === 0 || modal.loading} onClick={onModalSaved}>
            {
              modal.loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <React.Fragment>Save</React.Fragment>
              )
            }
          </Button>
        </Modal.Footer>  */}
    </div>

  )
}

export default PokemonList
