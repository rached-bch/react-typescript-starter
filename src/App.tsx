import React from "react";
import TodoListComponent from "./components/TodoListComponent";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoListComponent />
    </div>
  );
};

export default App;
