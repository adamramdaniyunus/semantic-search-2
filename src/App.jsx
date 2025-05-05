import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { embedAndSave, embeddingData } from "./utils/embbeding";
import "./App.css";
import { supabase } from "./utils/supabase";

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsEmbedding, setProductsEmbedding] = useState([]);

  const displayedProducts = productsEmbedding.length > 0
    ? products.filter((product) => productsEmbedding.includes(product.id))
    : products;

  const getData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setProductsEmbedding([]);
      getData();
      return;
    }
    const handleSearch = async () => {
      await handleInputUser();
    };
    if (searchQuery.length >= 3) {
      handleSearch();
    }

  }, [searchQuery]);

  // Filter berdasarkan input pencarian
  async function handleInputUser() {
    const text = searchQuery;
    const inputEmbedding = await embeddingData(text);
    const { data, error } = await supabase.rpc('search_product_by_embedding', {
      embedding_input: inputEmbedding
    });
    if (error) {
      console.error("Insert error:", error);
    } else {
      if (data.length > 0) {
        const productIds = data.map(item => Number(item.product_id));
        setProductsEmbedding(productIds);
      } else {
        return
      }
    }
  }


  return (
    <div className="app">
      <Navbar />
      <Hero />
      <section className="section">
        <h2>
          {productsEmbedding.length > 0 && searchQuery.length >= 3
            ? `Hasil pencarian untuk "${searchQuery}"`
            : "Produk Terbaru"}
        </h2>
        <input
          type="text"
          placeholder="Cari produk..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ProductList products={displayedProducts} />
      </section>
      <Footer />
    </div>
  );
}

export default App;
