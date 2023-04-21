import './App.css';
import React, { useState } from "react";

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItemIndex, setEditItemIndex] = useState(-1);
  const [archive, setArchive] = useState([]);

  const addItem = (event) => {
    event.preventDefault();
    setItems([...items, {text: newItem, done: false}]);
    setNewItem("");
  };

  const toggleDone = (index) => {
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  };

  const editItem = (index, newText) => {
    const newItems = [...items];
    newItems[index].text = newText;
    setItems(newItems);
    setEditItemIndex(-1);
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const archiveDoneItems = () => {
    const doneItems = items.filter((item) => item.done);
    setArchive([...archive, ...doneItems]);
    setItems(items.filter((item) => !item.done));
  };

  const unarchiveItem = (index) => {
    const itemToUnarchive = archive[index];
    setArchive(archive.filter((item, i) => i !== index));
    setItems([...items, itemToUnarchive]);
  };

  const deleteArchivedItem = (index) => {
    setArchive(archive.filter((item, i) => i !== index));
  };

  return (
    <div className="container">
    <div className="inner" id="list">
      <h1>To-Do List</h1>
      <form onSubmit={addItem}>
        <input className="inputText" type="text" value={newItem} onChange={(event) => setNewItem(event.target.value)}/>
        <button id="addItem" type="submit">Add Item</button>
      </form>
      <button onClick={archiveDoneItems} id="archive">Archive Done Items</button>
      <ul>
        {items.map((item, index) => (
          <div key={index}>
            {editItemIndex === index ? (
              <form onSubmit={(event) => editItem(index, event.target.newText.value)}>
                <input className="inputText" type="text" name="newText" defaultValue={item.text}/>
                <button type="button" onClick={() => setEditItemIndex(-1)}>Cancel</button>
              </form>
            ) : (
              <div id="listItems">
                <input type="checkbox" checked={item.done} onChange={() => toggleDone(index)}/>
                <span style={{ textDecoration: item.done ? "line-through" : "none" }}>
                  {item.text}
                </span>
                <button onClick={() => setEditItemIndex(index)}>Edit</button>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </ul>
      </div>
      {archive.length > 0 && (
        <div id="archiveList" className="inner">
          <h1>Archived</h1>
          <div>
            {archive.map((item, index) => (
              <div key={index}>
                <span style={{ textDecoration: item.done ? "line-through" : "none" }}>
                  {item.text}
                </span>
                <button onClick={() => setEditItemIndex(index)}>Edit</button>
                <button onClick={() => unarchiveItem(index)}>Unarchive</button>
                <button onClick={() => deleteArchivedItem(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;