import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); 
          if (user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/Home');
          }
        } else {
          setErrorMessage('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setErrorMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div className="custom-container d-flex justify-content-center align-items-center vh-100">
      <div className="custom-card card p-4">
        <h2 className="custom-title text-center mb-4">Login</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="custom-label">
              Username
            </label>
            <input
              type="text"
              className="form-control custom-input"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="custom-label">
              Password
            </label>
            <input
              type="password"
              className="form-control custom-input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn custom-button dark">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
