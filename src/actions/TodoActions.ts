import Dispatcher from "../dispatcher/Dispatcher";

export function refreshTodoList() {
  Dispatcher.dispatch({ type: "REFRESH_TODO_LIST" });
}

export function addTodo(params: { title: string }) {
  Dispatcher.dispatch({ type: "ADD_TODO", title: params.title });
}

export function deleteTodo(index: number) {
  Dispatcher.dispatch({ type: "DELETE_TODO", index });
}
