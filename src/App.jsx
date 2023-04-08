import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");

  function handleSubmit(event) {
    event.preventDefault();
    if (todo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), title: todo.trim(), completed: false },
      ]);
      setTodo("");
    }
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  let filteredTodos;
  if (filter === "all") {
    filteredTodos = todos;
  } else if (filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  return (
    <>
      <h1 className="text-center text-red-950 text-6xl font-thin">todos</h1>
      <div className="flex flex-col justify-center items-center my-12 ">
        <form onSubmit={handleSubmit}>
          <div className="items-center">
            <input
              className=""
              placeholder="What needs to be done?"
              type="text"
              value={todo}
              onChange={(event) => setTodo(event.target.value)}
            />
            <button type="submit">+</button>
          </div>
        </form>

        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <button onClick={() => handleComplete(todo.id)}>
                {todo.completed ? "Incomplete" : "Complete"}
              </button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
        <button onClick={handleClearCompleted}>Clear Completed</button>
      </div>
    </>
  );
}

export default TodoList;
