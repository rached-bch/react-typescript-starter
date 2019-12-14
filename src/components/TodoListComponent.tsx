import React, { Component } from "react";
import Todo from "../types/Todo";

interface TodoListInterface {
  todoList: Array<Todo>;
  loading: boolean;
  error: boolean;
}
class TodoListComponent extends Component<{}, TodoListInterface> {
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
        <h1>Todo list</h1>
        {loading && <div className="loading">Loading</div>}
        {error && <div className="error">Error</div>}
        {loading === false && error === false && (
          <div className="todo-list">
            {todoList.map((item, index) => (
              <div
                key={index}
                className={
                  item.deleted ? "todo-item todo-item--deleted" : "todo-item"
                }
              >
                <h2>
                  {item.title}{" "}
                  <button onClick={(event: any) => this.deleteTodo(index)}>
                    x
                  </button>
                </h2>
              </div>
            ))}
          </div>
        )}
        <button onClick={this.refreshTodoList}>Refresh</button>
      </div>
    );
  }
}

export default TodoListComponent;
