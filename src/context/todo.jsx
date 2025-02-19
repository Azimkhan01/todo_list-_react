import React, { createContext, useState } from "react";

// Create context
const todo = createContext();

// TodoProvider component
let TodoProvider = ( {children} ) => {
  // State to hold your todo data
  const [todos, setTodos] = useState([]);

  return (
    <todo.Provider value={{ todos , setTodos }}>
      {children}
    </todo.Provider>
  );
};

export { todo, TodoProvider };
