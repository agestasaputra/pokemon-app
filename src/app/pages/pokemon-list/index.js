import React from "react"
import './styles.scss'
import { NavLink } from "react-router-dom"
import { Spinner, Badge, Button, Modal, ToastContainer, Toast  } from "react-bootstrap"

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
  const [toast, setToast] = React.useState(false);

  React.useEffect(() => {
    onLocalStorageChecked();
  }, [])

  function onLocalStorageChecked() {
    setPokemon({
      ...pokemon,
      loading: true
    })
    const data = localStorage.getItem("pokemon");
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

  function onModalRemove() {
    setModal({
      ...modal,
      loading: true
    })
    const dataLocalStorage = JSON.parse(localStorage.getItem("pokemon"))
    const indexLocalStorageTarget = dataLocalStorage.findIndex((item) => item.customName === data.customName)

    if (indexLocalStorageTarget > -1) {
      dataLocalStorage.splice(indexLocalStorageTarget, 1)
      localStorage.setItem("pokemon", JSON.stringify(dataLocalStorage))
      onLocalStorageChecked();
    }

    setTimeout(() => {
      onModalClosed()
      onToggleToast(true)
    }, 500)
    
    setTimeout(() => {
      onToggleToast(false)
    }, 5000)
  }

  function onToggleToast(value) {
    setToast(value)
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
          <Button variant="success" disabled={modal.loading} onClick={onModalClosed}>
            No
          </Button>
          <Button variant="danger" type="submit" disabled={modal.loading} onClick={onModalRemove}>
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
                <React.Fragment>Yes</React.Fragment>
              )
            }
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center">
        <Toast show={toast} onClose={() => onToggleToast(false)}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Notification</strong>
            <small>3 seconds ago</small>
          </Toast.Header>
          <Toast.Body>Well done, Pokemon has been removed!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default PokemonList
