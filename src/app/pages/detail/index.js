import React from "react"
import axiosInstance from "config/services"
import './styles.scss'
import { ProgressBar, Spinner, Button, Modal, Form, ToastContainer, Toast } from "react-bootstrap"

const Detail = ({ location }) => {
  const [pokemon, setPokemon] = React.useState({
    data: {},
    loading: true
  })
  const [modal, setModal] = React.useState({
    show: false,
    loading: false
  });
  const [form, setForm] = React.useState({
    name: ""
  });
  const [toast, setToast] = React.useState({
    show: false,
    message: ''
  });
  const formNameRef = React.useRef();

  React.useEffect(() => {
    onFetchDetailPokemon()
  }, [])
  
  async function onFetchDetailPokemon() {
    try {
      const res = await axiosInstance.get(`/pokemon${location.pathname}`);
      setPokemon({
        ...pokemon,
        data: res.data,
        loading: false
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

  function onModalClosed() { 
    onFormReset()
    setModal({
      ...modal,
      show: false,
    })
  }
  
  function onModalShowed() {
    setModal({
      ...modal,
      show: true,
    })
    setTimeout(() => {
      formNameRef.current.focus()
    }, 100)
  }

  function onModalSaved(event) {
    event.preventDefault();
    setModal({
      ...modal,
      loading: true
    })

    const result = Math.random() < 0.5;

    if (result) {
      let payload = []
  
      if (localStorage.getItem("pokemon")) {
        payload = [
          ...JSON.parse(localStorage.getItem("pokemon")),
        ];
      }
      
      payload = [
        ...payload, 
        {
          name: pokemon.data.name,
          customName: form.name,
          id: pokemon.data.id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${location.pathname}.png`,
          sprites: pokemon.data.sprites
        }
      ]
      localStorage.setItem("pokemon", JSON.stringify(payload))
    }
    
    setTimeout(() => {
      onModalClosed()
      onToggleToast(true, result ? "success" : "error")
    }, 500)

    setTimeout(() => {
      onToggleToast(false, result ? "success" : "error")
    }, 5000)
  }

  function onToggleToast(value, type) {
    setToast({
      show: value,
      message: type === "success" ?
      `Well done, Pokemon has been added!` :
      `Uups! Failed to catch. Please try again!`
    })
  }

  function onFormReset() {
    setForm({
        ...form,
        name: ''
    })
  }

  return (
    <div className="container-detail">  
      { 
        Object.keys(pokemon.data).length === 0 && (
          <div className="loading-section text-center">
            <Spinner animation="border" variant="warning" />
          </div>
        ) 
      }
      {
        (Object.keys(pokemon.data).length > 0 && !pokemon.loading) && (
          <React.Fragment>
            <img src={pokemon.data.sprites.other.dream_world.front_default} alt={pokemon.data.name} className="img-pokemon"/>
            <div className="card">
              <div className="card-header">
                <h6 className="card-header__title"> { pokemon.data.name } </h6>
                <ProgressBar className="progress mb-1" variant="success" now={100} width={50} />
                <h6 className="card-header__desc"> { pokemon.data.stats[0].stat.name } { pokemon.data.stats[0].base_stat }/{ pokemon.data.stats[0].base_stat } </h6>
                <Button 
                  className="card-header__button"
                  variant="primary" 
                  size="block"
                  onClick={onModalShowed}
                >
                  Catch
                </Button>
              </div>
              <div className="card-content">
                <div className="card-content__desc">
                  <div className="desc-item">
                    <h6 className="desc-item__title">
                      {
                        pokemon.data.types.length > 1 ? 
                        `${pokemon.data.types[0].type.name} / ${pokemon.data.types[1].type.name}` :
                        pokemon.data.types[0].type.name
                      }
                    </h6>
                    <p className="desc-item__desc"> types </p>
                  </div>
                  <div className="desc-item">
                    <h6 className="desc-item__title">{ pokemon.data.weight }kg</h6>
                    <p className="desc-item__desc">weight</p>
                  </div>
                  <div className="desc-item">
                    <h6 className="desc-item__title">{ pokemon.data.height }m </h6>
                    <p className="desc-item__desc">height</p>
                  </div>
                </div>
                <div className="card-content__footer">
                  <div className="desc-item">
                    <ProgressBar className="progress mb-2" variant="primary" now={100} width={50} />
                    <h6 className="desc-item__title">ATK { pokemon.data.stats[1].base_stat }/{ pokemon.data.stats[1].base_stat }</h6>
                  </div>
                  <div className="desc-item">
                    <ProgressBar className="progress mb-2" variant="danger" now={100} width={50} />
                    <h6 className="desc-item__title">DEF { pokemon.data.stats[2].base_stat }/{ pokemon.data.stats[2].base_stat }</h6>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      }

      <Modal
        show={modal.show} 
        onHide={onModalClosed}
        backdrop="static"
        centered
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Pokemon Alias Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={formNameRef} type="text" placeholder="Ex: Bone" value={form.name} onChange={(event) => setForm({
                  name: event.target.value
                })} />
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" disabled={modal.loading} onClick={onModalClosed}>
              Close
            </Button>
            <Button variant="success" type="submit" disabled={form.name.length === 0 || modal.loading} onClick={onModalSaved}>
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
        </Form>
      </Modal>
      
      <ToastContainer position="top-center">
        <Toast show={toast.show} onClose={() => onToggleToast(false, "success")}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Notification</strong>
            <small>1 seconds ago</small>
          </Toast.Header>
          <Toast.Body>{ toast.message }</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default Detail
