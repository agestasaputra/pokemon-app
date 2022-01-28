import React from "react";
import './styles.scss'
// import moment from 'moment';
// import { useSelector } from "react-redux";
// import { doneTodo, undoneTodo, deleteTodo, fetchAllTodo } from "redux/actions/Todos"

const Landing = () => {
  // const store = useSelector(state => state);

  React.useEffect(() => {
    // onFetchAllTodo()
  }, [])

  // function onFetchAllTodo() {
  //   try {
  //     console.log("onFetchAllTodo!");
  //     fetchAllTodo();
  //   } catch (error) {
  //     alert(`Error - ${error.message}`)
  //     throw error;
  //   }
  // }

  // function onUnDone(key) {
  //   const payload = [...store.todo.datas];
  //   payload[key].status = "pending";
  //   console.log("onUnDone!");
  //   console.log("payload:", payload);
  //   undoneTodo(payload)
  // }

  // function onDone(key) {
  //   const payload = [...store.todo.datas];
  //   payload[key].status = "completed";
  //   console.log("onUnDone!");
  //   console.log("payload:", payload);
  //   doneTodo(payload)
  // }
  
  // function onDelete(key) {
  //   console.log("onDelete!");
  //   const payload = [...store.todo.datas];
  //   console.log("payload:", payload);
  //   payload.splice(key, 1)
  //   deleteTodo(payload)
  // }

  return (
    <div className="container-landing">
      <span className="desc">
        
        <div className="card mb-2">
          <header className="card-header">
            <p className="card-header-title">
              Title
              {/* {
                data.status === 'completed' ? (
                  <del>{ data.title }</del>
                ) : (
                  <React.Fragment>
                    { data.title }
                  </React.Fragment>
                )
              } */}
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <div> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
                electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. 
              </div>
              <div> <i> 28/01/2022 </i> </div>                         
              {/* {
                data.status === 'completed' ? (
                  <React.Fragment>
                    <del> { data.description } </del>
                    <div> <i>{ moment(data.due_on).format('LL') }</i> </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div> { data.description } </div>
                    <div> <i>{ moment(data.due_on).format('LL') }</i> </div>                         
                  </React.Fragment>
                )
              } */}
            </div>
          </div>
          <footer className="card-footer">
            <span className="card-footer-item btn-done" onClick={() => {}}>Done</span>
            {/* {
              data.status === 'completed' ? (
                <span className="card-footer-item btn-undone" onClick={() => onUnDone(key)}>Undone</span>
              ) : (
                <span className="card-footer-item btn-done" onClick={() => onDone(key)}>Done</span>
              )
            } */}
            <span className="card-footer-item btn-delete" onClick={() => {}}>Delete</span>
          </footer>
        </div>

        {/* {
          store.todo.datas.length > 0 ? (
            store.todo.datas.map((data, key) => (
              <div className="card mb-2" key={key} >
                <header className="card-header">
                  <p className="card-header-title">
                    {
                      data.status === 'completed' ? (
                        <del>{ data.title }</del>
                      ) : (
                        <React.Fragment>
                          { data.title }
                        </React.Fragment>
                      )
                    }
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    {
                      data.status === 'completed' ? (
                        <React.Fragment>
                          <del> { data.description } </del>
                          <div> <i>{ moment(data.due_on).format('LL') }</i> </div>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <div> { data.description } </div>
                          <div> <i>{ moment(data.due_on).format('LL') }</i> </div>                         
                        </React.Fragment>
                      )
                    }
                  </div>
                </div>
                <footer className="card-footer">
                  {
                    data.status === 'completed' ? (
                      <span className="card-footer-item btn-undone" onClick={() => onUnDone(key)}>Undone</span>
                    ) : (
                      <span className="card-footer-item btn-done" onClick={() => onDone(key)}>Done</span>
                    )
                  }
                  <span className="card-footer-item btn-delete" onClick={() => onDelete(key)}>Delete</span>
                </footer>
              </div>
            ))
          ) : (
            <div className="empty-message">To Do list is Empty!</div>
            )
          } */}
        {/* <div className="empty-message">To Do list is Empty!</div> */}


        <div className="card mb-2">
          <header className="card-header">
            <p className="card-header-title">
              Title
            </p>
        </header>
        <div className="card-content">
          <div className="content">
            <div> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. 
            </div>
            <div> <i> 28/01/2022 </i> </div>  
            </div>
          </div>
          <footer className="card-footer">
            <span className="card-footer-item btn-done" onClick={() => {}}>Done</span>
            <span className="card-footer-item btn-delete" onClick={() => {}}>Delete</span>
          </footer>
        </div>
      </span>
    </div>

  );
};

export default Landing;
