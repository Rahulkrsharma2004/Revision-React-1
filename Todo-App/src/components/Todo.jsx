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
  const [assignfilterValue, setAssignfilterValue] = useState("");
  const [sorting, setSorting] = useState("");

  const getData = async () => {
    try {
      let URL = `http://localhost:3000/todos?_page=${page}&_per_page=10`;
      if (filterValue) {
        URL += `&status=${filterValue}`;
      }
      if (assignfilterValue) {
        URL += `&name=${assignfilterValue}`;
      }
      const { data } = await axios.get(URL);
      setTotalPage(Math.ceil(data.items / 10));
      setItems(data.items);

      if (sorting === "Latest") {
        const sorted = data.data.slice().sort((a, b) => {
          return (
            new Date(b.completionDateTime) - new Date(a.completionDateTime)
          );
        });
        setTodos(sorted);
      } else if (sorting === "Earlier") {
        const sorted = data.data.slice().sort((a, b) => {
          return (
            new Date(a.completionDateTime) - new Date(b.completionDateTime)
          );
        });
        setTodos(sorted);
      } else {
        setTodos(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    console.log(sorting)
  }, [page, filterValue, assignfilterValue, sorting]);

  const handleAdd = (title, name) => {
    const newTodo = {
      name,
      title,
      status: "Pending",
      completionDateTime: Date(),
    };

    axios({
      method: "POST",
      baseURL: "http://localhost:3000/",
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
      baseURL: "http://localhost:3000/",
      url: `/todos/${id}`,
      data: { status: "Completed" },
    })
      .then(() => getData())
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios({
      method: "DELETE",
      baseURL: "http://localhost:3000/",
      url: `/todos/${id}`,
    })
      .then(() => getData())
      .catch((error) => console.log(error));
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleAssignFilterChange = (e) => {
    setAssignfilterValue(e.target.value);
  };
  const handleSorting = (e) => {
    setSorting(e.target.value);
  };

  return (
    <div>
      <TodoInput handleAdd={handleAdd} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ marginRight: "2rem" }}>
            <h2>Filter By Status</h2>
            <select value={filterValue} onChange={handleFilterChange}>
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <h2>Filter By Assign To</h2>
            <select
              value={assignfilterValue}
              onChange={handleAssignFilterChange}>
              <option value="">Select AssignTo</option>
              <option value="Rahul">Rahul</option>
              <option value="Murtaza">Murtaza</option>
              <option value="Prince">Prince</option>
              <option value="Shubham">Shubham</option>
            </select>
          </div>
        </div>
        <div>
          <h2>Shorting By DateTime</h2>
          <select value={sorting} onChange={handleSorting}>
            <option value="">Select Sorting</option>
            <option value="Latest">Latest</option>
            <option value="Earlier">Earlier</option>
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
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
