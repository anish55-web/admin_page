import React from 'react';
import './Product.css'; 

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h5 className="product-name">{product.name}</h5>
        <p className="product-price">
          <strong>₹{product.price}</strong>
        </p>
        <p className="product-description">{product.description}</p>
        <button className="btn btn-success">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
