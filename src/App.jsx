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
      <div className="flex flex-col mt-12 mx-2 lg:mx-auto py-8  bg-red-200 rounded-lg max-w-4xl">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-row ">
            <input
              className="w-full mx-2 placeholder:text-red-400 focus:outline-red-200 outline-none bg-transparent border border-white p-1 rounded-lg "
              placeholder="What needs to be done?"
              type="text"
              value={todo}
              onChange={(event) => setTodo(event.target.value)}
            />
            <button
              onClick={() => setFilter("all")}
              className="mr-2 px-3 py-0 bg-red-400  text-white rounded-lg text-xs font-bold "
              type="submit"
            >
              add
            </button>
          </div>
        </form>

        <ul className="mt-4">
          {filteredTodos.map((todo) => (
            <li className="flex justify-between gap-2 mx-2 my-2 " key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <button
                className="ml-auto text-white px-3 py-1 rounded-lg text-xs bg-red-400"
                onClick={() => handleComplete(todo.id)}
              >
                {todo.completed ? "Incomplete" : "Complete"}
              </button>
              <button
                className="mr-0 px-3 py-1 rounded-lg text-xs text-white bg-red-400"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="mx-2 flex flex-row justify-between mt-14">
          <div className="flex flex-row gap-3">
            <button
              className="bg-red-400 px-3 py-1 rounded-lg text-xs text-white"
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className="bg-red-400 px-3 py-1 rounded-lg text-xs text-white"
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className="bg-red-400 px-3 py-1 rounded-lg text-xs text-white"
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <button
            className="bg-red-400 px-3 py-1 rounded-lg text-xs text-white"
            onClick={handleClearCompleted}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoList;
