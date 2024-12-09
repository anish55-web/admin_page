
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle login
  const login = (username, password) => {
    fetch(`http://localhost:5000/users?username=${username}&password=${password}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const loggedInUser = data[0];
          localStorage.setItem('user', JSON.stringify(loggedInUser)); // Store user in localStorage
          setUser(loggedInUser); 
        } else {
          alert('Invalid username or password');
        }
      });
  };

  


  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};