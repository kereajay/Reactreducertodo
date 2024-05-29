import { useReducer, useState, createContext, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Todo from "./Todo";

export const todocontext = createContext();
const initialstate = {
  todos: [],
  searchtodo: [],
};
const reducerfn = (state, action) => {
  switch (action.type) {
    case "addtodo":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "deletetodo":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    case "edittodo":
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name }
            : item
        ),
      };
    case "checktodo":
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload
            ? { ...item, ischecked: !item.ischecked }
            : item
        ),
      };
    case "searchtodo":
      return {
        ...state,
        todos: state.todos.filter((item) =>
          item.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(
    reducerfn,
    JSON.parse(localStorage.getItem("todos")) || initialstate
  );
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <todocontext.Provider value={{ state, dispatch }}>
        <Todo />
      </todocontext.Provider>
    </>
  );
}

export default App;
