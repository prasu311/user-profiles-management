import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load users from localStorage
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
    setLoading(false);
  }, []);

  // Save users to localStorage
  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Please enter name and email.");

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = { name, email };
      saveUsers(updatedUsers);
      setEditIndex(null);
    } else {
      saveUsers([...users, { name, email }]);
    }
    setName("");
    setEmail("");
  };

  const handleEdit = (index) => {
    setName(users[index].name);
    setEmail(users[index].email);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure to delete?")) return;
    const updatedUsers = users.filter((_, i) => i !== index);
    saveUsers(updatedUsers);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Profiles Management</h1>

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-success w-100" type="submit">
              {editIndex !== null ? "Update User" : "Add User"}
            </button>
          </div>
        </div>
      </form>

      <div className="row">
        {users.length === 0 && <p className="text-center">No users found.</p>}
        {users.map((user, index) => (
          <div className="col-md-4" key={index}>
            <div className="user-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <button
                className="btn btn-primary me-2"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
