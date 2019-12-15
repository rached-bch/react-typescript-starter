import React, { Component, createRef } from "react";
import Todo from "../types/Todo";

interface TodoListInterface {
  todoList: Array<Todo>;
  loading: boolean;
  error: boolean;
}
class TodoListComponent extends Component<{}, TodoListInterface> {
  inputTodoRef = createRef<HTMLInputElement>();
  constructor(props: {}) {
    super(props);
    this.state = {
      todoList: [{ title: "First todo", deleted: false }],
      loading: false,
      error: false
    };
  }
  deleteTodo = (index: number) => {
    const todoList = this.state.todoList;
    todoList.map((item: Todo, i: number) => {
      if (index === i) {
        todoList[index] = { title: item.title, deleted: true };
        this.setState({
          todoList: todoList
        });
      }
    });
  };

  addTodo = () => {
    const todoList = this.state.todoList;
    const title: string = this.inputTodoRef.current?.value
      ? this.inputTodoRef.current?.value
      : "";
    if (title.length > 0) {
      todoList.push({ title: title, deleted: false });
      this.setState({
        todoList: todoList
      });
    }
  };

  componentDidMount() {
    this.refreshTodoList();
  }

  // deleteTodo = (event: any) => {
  //   console.log("test", event);
  // };
  refreshTodoList = () => {
    this.setState({
      loading: true,
      error: false
    });
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then(response => response.json())
      .then(json => {
        let todoList: Array<Todo> = [];

        json.map((item: any) => {
          todoList.push({ title: item.title, deleted: false });
        });
        this.setState({
          todoList: todoList,
          loading: false,
          error: false
        });
      })
      .catch(reason => {
        this.setState({
          loading: false,
          error: true
        });
      });
  };
  render() {
    let { todoList, loading, error } = this.state;
    return (
      <div>
        <h4 className="card-title">Awesome Todo list</h4>
        <div className="add-items d-flex">
          {" "}
          <input
            type="text"
            className="form-control todo-list-input"
            placeholder="What do you need to do today?"
            ref={this.inputTodoRef}
          />{" "}
          <button
            onClick={(event: any) => this.addTodo()}
            className="add btn btn-primary font-weight-bold todo-list-add-btn"
          >
            Add
          </button>{" "}
        </div>
        {loading && <div className="loading">Loading</div>}
        {error && <div className="error">Error</div>}
        {loading === false && error === false && (
          <div className="list-wrapper">
            <ul className="d-flex flex-column-reverse todo-list">
              {todoList.map((item, index) => {
                if (item.deleted === false) {
                  return (
                    <li key={index} className="todo-item">
                      <div className="form-check">
                        {" "}
                        <label className="form-check-label">
                          {" "}
                          {item.title} <i className="input-helper"></i>
                        </label>{" "}
                      </div>{" "}
                      <i
                        className="remove mdi mdi-close-circle-outline"
                        onClick={(event: any) => this.deleteTodo(index)}
                      ></i>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default TodoListComponent;
