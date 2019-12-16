import { EventEmitter } from "events";
import Todo from "../types/Todo";
import TodoList from "../types/TodoList";

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
}

const todoStore = new TodoStore();

export default todoStore;
