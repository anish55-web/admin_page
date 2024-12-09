import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: null,
  });
  const navigate = useNavigate();

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProduct({
        ...newProduct,
        image: reader.result, // Store the image as a base64 string
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Add product to the database
  const handleAddProductToDB = () => {
    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then(() => {
        navigate('/admin'); // Redirect to Admin page after adding product
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  return (
    <div className="container mt-5">
      <h3>Add New Product</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Product Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>
      <button className="btn btn-success" onClick={handleAddProductToDB}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
