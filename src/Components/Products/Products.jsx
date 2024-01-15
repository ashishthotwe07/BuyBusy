// Products.js
import React, { useState } from "react";
import ProductCard from "./ProductsCard";
import { ProductData } from "../../data.js";
import "./Products.css";

export default function Products() {
  // Extract unique categories from the product data
  const uniqueCategories = [
    ...new Set(ProductData.map((product) => product.category)),
  ];

  // State to keep track of selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      // Category is already selected, remove it
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    } else {
      // Category is not selected, add it
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  return (
    <>
      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="products-container">
        <div className="filter-section">
          <h3>Filter </h3>
          <label>
            {uniqueCategories.map((category) => (
              <div key={category} className="category">
                <div>
                  {category}
                </div>
                
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                />
              </div>
            ))}
          </label>
        </div>
        <div className="products-list">
          {ProductData.filter(
            (product) =>
              // Filter products based on selected categories
              selectedCategories.length === 0 ||
              selectedCategories.includes(product.category)
          ).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
