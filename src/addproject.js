import React, { useState } from "react";

const AddProductForm = ({ onAddProduct, onCancel }) => {
  const [product, setProduct] = useState({
    sku: "",
    name: "",
    price: "",
    type: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { sku, name, price, type, ...attributes } = product;
    onAddProduct({ sku, name, price, type, attributes });
    setProduct({
      sku: "",
      name: "",
      price: "",
      type: "",
      size: "",
      weight: "",
      height: "",
      width: "",
      length: "",
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} id="product_form">
      <label>
        SKU:
        <input
          type="text"
          name="sku"
          value={product.sku}
          onChange={handleChange}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Price ($):
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Product Type:
        <select name="type" value={product.type} onChange={handleChange}>
          <option value=""></option>
          <option value="DVD">DVD</option>
          <option value="Book">Book</option>
          <option value="Furniture">Furniture</option>
        </select>
      </label>
      {product.type === "DVD" && (
        <label>
          Size (MB):
          <input
            type="number"
            name="size"
            value={product.size}
            onChange={handleChange}
          />
        </label>
      )}
      {product.type === "Book" && (
        <label>
          Weight (Kg):
          <input
            type="number"
            name="weight"
            value={product.weight}
            onChange={handleChange}
          />
        </label>
      )}
      {product.type === "Furniture" && (
        <div>
          <label>
            Height (in):
            <input
              type="number"
              name="height"
              value={product.height}
              onChange={handleChange}
            />
          </label>
          <label>
            Width (in):
            <input
              type="number"
              name="width"
              value={product.width}
              onChange={handleChange}
            />
          </label>
          <label>
            Length (in):
            <input
              type="number"
              name="length"
              value={product.length}
              onChange={handleChange}
            />
          </label>
        </div>
      )}
      <button type="submit">Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default AddProductForm;
