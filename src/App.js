import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./component/context/AuthContext";
import Login from "./component/login";
import Home from "./component/Home";
import Admin from "./component/Admin";

import AddProduct from "./component/Add";
import EditProduct from "./component/edit";

function App() {

  return (
    <>
      <AuthProvider>
        <Router>

          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </Router>
      </AuthProvider>




    </>
  )
}

export default App