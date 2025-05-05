import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
