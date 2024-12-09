import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch users and products
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser.role !== 'admin') {
      navigate('/');
      return;
    }

    // Fetch users and products from json-server
    Promise.all([
      fetch('http://localhost:5000/users').then((res) => res.json()),
      fetch('http://localhost:5000/products').then((res) => res.json()),
    ])
      .then(([userData, productData]) => {
        setUsers(userData);
        setProducts(productData);
        setLoading(false);
      })
      .catch((error) => console.log('Error fetching data:', error));
  }, [navigate]);

  // Delete user
  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter((user) => user.id !== id)));
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(products.filter((product) => product.id !== id)));
  };

  // Navigate to Edit Product Page
  const handleEditProduct = (product) => {
    navigate(`/edit/${product.id}`);
  };

  //  Navigate to Add Product Page
  const handleAddProduct = () => {
    navigate('/add');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1>Admin Panel</h1>

      {/* Users Table */}
      <h2>Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== 'admin' && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* Products Table  */}
      <h2>Products</h2>
      <button className="btn btn-outline-primary" onClick={handleAddProduct}>
        Add New Product
      </button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;