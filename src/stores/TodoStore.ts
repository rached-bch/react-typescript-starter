import { EventEmitter } from "events";
import Todo from "../types/Todo";
import TodoList from "../types/TodoList";
import Dispatcher from "../dispatcher/Dispatcher";

class TodoStore extends EventEmitter {
  private state: TodoList = {
    todoList: [],
    loading: false,
    error: false
  };
  constructor() {
    super();
  }
  getAll() {
    return this.state.todoList;
  }
  getState() {
    return this.state;
  }
  refreshTodoList() {
    this.state.loading = true;
    this.state.error = true;
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then(response => response.json())
      .then(json => {
        let todoList: Array<Todo> = [];

        json.map((item: any) => {
          todoList.push({ title: item.title, deleted: false });
        });
        this.state.loading = false;
        this.state.error = false;
        this.state.todoList = todoList;
        this.emit("change");
      })
      .catch(reason => {
        this.state.loading = false;
        this.state.error = true;
        this.emit("change");
      });
  }

  addTodo(params: { title: string }) {
    const title: string =
      typeof params.title !== "undefined" ? params.title : "";
    const todoList = this.state.todoList;
    if (title.length > 0) {
      todoList.unshift({ title, deleted: false });
      this.state.todoList = todoList;
      this.emit("change");
    }
  }

  deleteTodo = (index: number) => {
    const todoList = this.state.todoList;
    todoList.map((item: Todo, i: number) => {
      if (index === i) {
        todoList[index] = { title: item.title, deleted: true };
      }
    });
    this.state.todoList = todoList;
    this.emit("change");
  };

  handleActions(action: any) {
    console.log("todo handle action : ", action);
    switch (action.type) {
      case "REFRESH_TODO_LIST": {
        this.refreshTodoList();
      }
      case "ADD_TODO": {
        this.addTodo({ title: action.title });
      }
      case "DELETE_TODO": {
        this.deleteTodo(action.index);
      }
    }
  }
}

const todoStore = new TodoStore();
Dispatcher.register(todoStore.handleActions.bind(todoStore));
export default todoStore;
