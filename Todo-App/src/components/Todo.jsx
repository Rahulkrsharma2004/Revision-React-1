import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [items, setItems] = useState();
  const [filterValue, setFilterValue] = useState("");

  const getData = async () => {
    try {
      const URL = filterValue
        ? `http://localhost:4000/todos?_page=${page}&_per_page=5&status=${filterValue}`
        : `http://localhost:4000/todos?_page=${page}&_per_page=5`;
      const { data } = await axios.get(URL);
      setTotalPage(Math.ceil(data.items / 5));
      setTodos(data.data);
      setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [page, filterValue]);

  const handleAdd = (title, name) => {
    const newTodo = {
      name,
      title,
      status: false,
      completionDateTime: Date(),
    };

    axios({
      method: "POST",
      baseURL: "http://localhost:4000/",
      url: "/todos",
      data: newTodo,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => getData())
      .catch((error) => console.log(error));
  };

  const handleUpdate = (id, status) => {
    axios({
      method: "PATCH",
      baseURL: "http://localhost:4000/",
      url: `/todos/${id}`,
      data: { status: !status },
    })
      .then(() => getData())
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios({
      method: "DELETE",
      baseURL: "http://localhost:4000/",
      url: `/todos/${id}`,
    })
      .then(() => getData())
      .catch((error) => console.log(error));
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    console.log(filterValue)
  };

  return (
    <div>
      <TodoInput handleAdd={handleAdd} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h2>Filter By Status</h2>
          <select onChange={handleFilterChange}>
            <option value="">--</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div>
          <h2>Filter By DateTime</h2>
          <select>
            <option value="">--</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <button> {page} </button>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPage}>
          Next
        </button>
      </div>
      <h3 style={{ display: "flex", justifyContent: "end" }}>
        {" "}
        Total_Item:{items}{" "}
      </h3>
      <div>
        {todos.map((ele, ind) => (
          <TodoItem
            {...ele}
            key={ele.id}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            ind={ind}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
