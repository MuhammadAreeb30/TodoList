import React, { useEffect, useState } from "react";
import "./Todo.css";

const Todo = () => {
  // get localStorage Data
  const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

  // States
  const [todoData, setTodoData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItems, setIsEditItems] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  // add list
  const addList = () => {
    if (!todoData) {
      alert("Please Fill the Data");
    } else if (todoData && toggleBtn) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItems) {
            return { ...curElem, name: todoData };
          }
          return curElem;
        })
      );
      setTodoData("");
      setIsEditItems(null);
      setToggleBtn(false);
    } else {
      const myNewTodoData = {
        id: new Date().getTime().toString(),
        name: todoData,
      };
      setItems([...items, myNewTodoData]);
      setTodoData("");
    }
  };

  // edit item
  const editItem = (index) => {
    const todo_list_edit = items.find((curElem) => {
      return curElem.id === index;
    });
    setTodoData(todo_list_edit.name);
    setIsEditItems(index);
    setToggleBtn(true);
  };

  // delete item
  const deleteItems = (index) => {
    const updateItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updateItems);
  };

  // remove all data
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="todo-container">
        <img
          src="https://cdn4.iconfinder.com/data/icons/engineering-13/50/100-1024.png"
          alt="Todo List"
        />
        <h1>Add Your List Here ✌</h1>
        <div className="input-container">
          <input
            type="text"
            id="todo-input"
            placeholder="✍ Add Item"
            value={todoData}
            onChange={(e) => setTodoData(e.target.value)}
          />
          {toggleBtn ? (
            <i className="far fa-edit" onClick={addList}></i>
          ) : (
            <i className="fa fa-plus" onClick={addList}></i>
          )}
        </div>
        {/* TodoList */}
        {items.map((curElement) => {
          return (
            <ul key={curElement.id} className="todo-list" id="todo-list">
              <li>
                <span className="text">{curElement.name}</span>
                <div className="icons">
                  <i
                    className="far fa-edit"
                    onClick={() => editItem(curElement.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt"
                    onClick={() => deleteItems(curElement.id)}
                  ></i>
                </div>
              </li>
            </ul>
          );
        })}
        {/* rmeove all button  */}
        <div className="showItems">
          <button
            className="btn effect04"
            data-sm-link-text="Remove All"
            onClick={removeAll}
          >
            <span> CHECK LIST</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;