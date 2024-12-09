import React, { useState, useEffect } from 'react';
import ProductCard from './Products';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Our Products</h1>

      {loading && <p className="text-center">Loading products...</p>}

      {error && (
        <p className="text-center text-danger">
          Failed to load products: {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center">No products available at the moment.</p>
      )}

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
