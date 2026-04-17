import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Lista de produtos atualizada:", products);
  }, [products]);

  function addProduct(product) {
    setProducts([...products, product]);
  }

  return (
    <div className="container">
      <Header />

      <img
        src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
        alt="ecommerce"
        className="banner"
      />

      <ProductForm onAdd={addProduct} />
      <ProductList products={products} />

      <Footer />
    </div>
  );
}

export default Home;
