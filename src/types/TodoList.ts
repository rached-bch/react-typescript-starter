import Todo from "../types/Todo";

export default interface TodoListInterface {
  todoList: Array<Todo>;
  loading: boolean;
  error: boolean;
}
