import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProduct({
        ...product,
        image: reader.result, // Store the image as a base64 string
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Update product in the database
  const handleUpdateProduct = () => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(() => {
        navigate('/admin'); // Redirect to Admin page after editing
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h3>Edit Product</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={product.name}
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
          value={product.description}
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
          value={product.price}
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
      <button className="btn btn-success" onClick={handleUpdateProduct}>
        Save Changes
      </button>
    </div>
  );
};

export default EditProduct;
