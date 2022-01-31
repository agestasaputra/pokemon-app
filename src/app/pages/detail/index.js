import React from "react"
import axiosInstance from "config/services"
import './styles.scss'
import { ProgressBar, Spinner, Accordion, Badge, ListGroup, Button, Modal, Form } from "react-bootstrap"

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
  const formNameRef = React.useRef();

  React.useEffect(() => {
    onFetchDetailPokemon()
  }, [])
  
  async function onFetchDetailPokemon(data, from) {
    try {
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

  function onGetProgressBarVariant(name) {
    let result = "";
    switch (name) {
      case "hp":
        result = "primary";
        break;
      case "attack":
        result = "danger";
        break;
      case "defense":
        result = "success";
        break;
      case "special-attack":
        result = "danger";
        break;
      case "special-defense":
        result = "success";
        break;
      case "speed":
        result = "info";
        break;
      default:
        result = "primary";
        break;
    }
    return result;
  }
  
  function onGetBadgeVariant(name) {
    let result = "";
    switch (name) {
      case "bug":
        result = "danger";
        break;
      case "fire":
        result = "danger";
        break;
      case "water":
        result = "primary";
        break;
      case "flying":
        result = "info";
        break;
      case "grass":
        result = "success";
        break;
      case "poison":
        result = "warning";
        break;
      default:
        result = "primary";
        break;
    }
    return result;
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
    console.log("payload:", payload)
    localStorage.setItem("pokemon", JSON.stringify(payload))
    
    setTimeout(() => {
      onModalClosed()
    }, 500)
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
        Object.keys(pokemon.data).length > 0 && (
          <React.Fragment>
            <div className="info-img">  
              <img src={pokemon.data.sprites.front_default} alt={pokemon.data.name} />
            </div>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span>
                    Statistics
                  </span>
                  <span>
                    <i className="fa fa-chevron-down" />
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  {
                    pokemon.data.stats.length > 0 ? pokemon.data.stats.map((poke, key) => (
                      <React.Fragment key={key}>
                          <span className="info-stats__detail-title">
                            <span className="info-stats__detail-title__left">
                            { poke.stat.name.replace(/-/g, ' ') }
                            </span>
                            <span className="info-stats__detail-title__right">
                            { poke.base_stat }
                            </span>
                          </span>
                          <ProgressBar className="progress mb-2" variant={onGetProgressBarVariant(poke.stat.name)} now={100} />
                        </React.Fragment>
                    )) : (
                      <div> Empty Statistics! </div>
                    )
                  }
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span>
                    Types
                  </span>
                  <span>
                    <i className="fa fa-chevron-down" />
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                {
                  pokemon.data.types.length > 0 ? pokemon.data.types.map((poke, key) => (
                    <Badge key={key} pill bg={onGetBadgeVariant(poke.type.name)}>
                      { poke.type.name }
                    </Badge>
                  )) : (
                    <div> Empty Types! </div>
                  )
                }
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <span>
                    Moves
                  </span>
                  <span>
                    <i className="fa fa-chevron-down" />
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                  {
                    pokemon.data.moves.length > 0 ? pokemon.data.moves.map((poke, key) => (
                        <ListGroup.Item key={key} variant="primary" > { poke.move.name.replace(/-/g, ' ') } </ListGroup.Item>
                    )) : (
                      <div> Empty Types! </div>
                    )
                  }
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="d-grid mt-4">
              <Button 
                variant="success" 
                size="block"
                // disabled={loadingLoadMore}
                onClick={onModalShowed}
              >
                Catch
              </Button>
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
            <Button variant="primary" disabled={modal.loading} onClick={onModalClosed}>
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
    </div>
  )
}

export default Detail
