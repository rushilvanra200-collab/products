import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", price: "", id: "", description: "", quntity: "", categori: "" });
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  // GET users
  const getUsers = async () => {
    const res = await axios.get("http://localhost:3000/product");
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // POST user
  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`http://localhost:3000/product/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:3000/product", form);
    }
    setForm({ name: "", price: "" });
    getUsers();
  };

  // DELETE user
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/product/${id}`);
    getUsers();
  };

  // Edit user
  const editUser = (u) => {
    setForm({ name: u.name, price: u.price });
    setEditId(u._id);
  };

  return (
    <div className="app-container">
      <h2>Product List</h2>

      <input
        type="text"
        placeholder="ProductName"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="ProductPrice"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        type="number"
        placeholder="ProductID"
        value={form.id}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        type="string"
        placeholder="ProductDecription"
        value={form.description}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        type="number"
        placeholder="Productquntity"
        value={form.quntity}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        type="string"
        placeholder="Productcategori"
        value={form.categori}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update Product" : "Add Product"}
      </button>

      <hr />

      <h3>Product List</h3>

      {users.map((u) => (
        <div key={u._id} className="product-card">
          <p><strong>Product Name:</strong> {u.name}</p>
          <p><strong>Product Price:</strong> {u.price}</p>

          <button onClick={() => editUser(u)}>Edit</button>
          <button onClick={() => deleteUser(u._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;