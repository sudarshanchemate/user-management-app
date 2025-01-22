import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", department: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser({
        name: response.data.name,
        email: response.data.email,
        department: response.data.company.name,
      });
    } catch (err) {
      setError("Failed to fetch user details.");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
      } else {
        await axios.post("https://jsonplaceholder.typicode.com/users", user);
      }
      navigate("/");
    } catch (err) {
      setError("Failed to save user.");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit User" : "Add User"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Department</label>
          <input type="text" name="department" value={user.department} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default UserForm;
