import React from "react"
import './styles.scss'
// import axiosInstance from "config/services"
import { NavLink } from "react-router-dom"
import { Spinner, Badge, Button, Modal } from "react-bootstrap"

const PokemonList = ({ state, dispatch }) => {
  const [pokemon, setPokemon] = React.useState({
    next: '',
    list: [],
    loading: false,
  })
  const [data, setData] = React.useState()
  const [modal, setModal] = React.useState({
    show: false,
    loading: false
  });

  React.useEffect(() => {
    onLocalStorageChecked();
  }, [])

  function onLocalStorageChecked() {
    console.log("onLocalStorageChecked!");
    setPokemon({
      ...pokemon,
      loading: true
    })
    const data = localStorage.getItem("pokemon");
    console.log("data:", JSON.parse(data))
    setTimeout(() => {
      setPokemon({
        ...pokemon,
        list: JSON.parse(data) || [],
        loading: false
      })
    }, 500)
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
    setData(data)
    onModalShowed()
  }

  function onModalShowed() {
    setModal({
      ...modal,
      show: true,
    })
  }
  
  function onModalClosed() {
    setModal({
      ...modal,
      show: false,
    })
  }

  function onModalSaved() {
    setModal({
      ...modal,
      loading: true
    })
    const dataLocalStorage = JSON.parse(localStorage.getItem("pokemon"))
    const indexLocalStorageTarget = dataLocalStorage.findIndex((item) => item.customName === data.customName)

    if (indexLocalStorageTarget > -1) {
      const newDataLocalStorage = dataLocalStorage.splice(0, indexLocalStorageTarget)
      localStorage.setItem("pokemon", JSON.stringify(newDataLocalStorage))
      onLocalStorageChecked();
    }

    setTimeout(() => {
      onModalClosed()
    }, 500)
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
          (pokemon.list.length > 0 && !pokemon.loading) && (
            pokemon.list.map((data, key) => (
              <div className="card" key={key}>
                <div className="card-info">
                  <div className="card-info__header">
                    <h6 className="card-info__header--text">
                      { data.customName }
                    </h6>
                    <Badge pill bg="danger" className="card-info__header--tag">
                      <label> { data.name} </label>
                    </Badge>
                  </div>
                  <div className="card-info__action">
                    {/* <i className="fa fa-2x fa-info-circle" />
                    <i className="fa fa-2x fa-trash" onClick={() => {}}/> */}
                    <NavLink to={`/${data.id}`} onClick={onCardClicked}>
                      <Button variant="primary">
                        <i className="fa fa-info-circle" />
                      </Button>
                    </NavLink>
                    &nbsp;
                    <Button 
                      variant="danger"
                      onClick={() => onTrashClicked(data)}
                    >
                      <i className="fa fa-trash"/>
                    </Button>
                  </div>
                </div>
                <img src={data.image} alt={data.name} />
              </div>
            ))
          )
        }
      </span>
      { pokemon.list.length === 0 && !pokemon.loading && <div className="empty-message">My Pokemon list is Empty!</div> }  

      <Modal
        show={modal.show} 
        onHide={onModalClosed}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete?          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={modal.loading} onClick={onModalClosed}>
            Close
          </Button>
          <Button variant="danger" type="submit" disabled={modal.loading} onClick={onModalSaved}>
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
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default PokemonList
