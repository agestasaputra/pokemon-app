import React from "react";
import './styles.scss'
// import { postTodo } from "redux/actions/Todos"
// import { useSelector } from "react-redux"

const Create = () => {
  // const store = useSelector(state => state);
  const [form, setForm] = React.useState({
    id: 0,
    user_id: 0,
    title: "",
    description: "",
    due_on: new Date(),
    status: "pending"
  })

  function onSubmit(event) {
    try {
      event.preventDefault();
      console.log("onSubmit!");
      // const payload = [...store.todo.datas, form];
      // console.log("payload:", payload);
      // postTodo(payload)
      onReset();
    } catch (error) {
      alert(`Error! ${error.message}`)
      throw error;
    }
  }

  function onReset() {
    setForm({
      name: '',
      description: '',
      status: 'pending',
    })
  }

  return (
    <div className="container-create">
      <span className="desc">
        <form onSubmit={onSubmit}>
          <div className="control mb-4">
            <label className="label" htmlFor="name"> Name </label>
            <input 
              className="input" 
              type="text" 
              placeholder="Ex: Learning ReactJS" 
              id="name" 
              value={form.title || ""}
              onChange={e => setForm({
                ...form,
                title: e.target.value
              })} 
            />
          </div>
          <div className="control mb-5">
            <label className="label" htmlFor="description"> Description </label>
            <textarea 
              className="textarea" 
              placeholder="Ex: Learning Redux and Learning Axios" 
              id="description" 
              value={form.description || ""}
              onChange={e => setForm({
                ...form,
                description: e.target.value
              })} 
            />
          </div>
          <button className="button is-fullwidth is-link" type="submit" value="Submit"> Submit </button>
        </form>
      </span>
    </div>

  );
};

export default Create;
