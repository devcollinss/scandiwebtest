import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    sku: "",
    name: "",
    price: "",
    productType: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });
  const [error, setError] = useState('')
  const [errorG, setErrorG] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [id]: value }));
    console.log(product)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const { sku, name, price, type, ...attributes } = product;
    
    // Check if required fields are empty
    if (product.sku == '' || product.name == '' || product.price == '' || product.productType == '') {
      setErrorG("Please, provide All info");
      return;
    } else {
      setErrorG('')
    }
    if (product.productType === "dvd" && !product.size) {
      setError("Please, provide size");
      return;
    } else {
      setError('');
    }
    if (product.productType === "book" && !product.weight) {
      setError("Please, provide weight");
      return;
    } else {
      setError('');
    }
    if (product.productType === "furniture" && (!product.height || !product.width || !product.length)) {
      setError("Please, provide height, width, and length");
      return;
    } else {
      setError('');
    }
  
    // Send form data as JSON to PHP script

axios.post('https://scandiwebtest.moe-enugustate.com/addproduct.php', product, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log(response.data);
    // Reset form after successful submission
    setProduct({
        sku: "",
        name: "",
        price: "",
        productType: "",
        size: "",
        weight: "",
        height: "",
        width: "",
        length: "",
    });
    setErrorG('')
    navigate('/')
})
.catch(error => {
  setErrorG('Sku Already Exist')
    console.error('There was an error submitting the form:', error);
});

  };

  


  return (
    <main>
        <nav>
            <div><h1>Add Product</h1></div>
            <div className='btn'>
                <button onClick={handleSubmit}>Save </button>
                <button onClick={()=> navigate("/")}>Cancel</button>
            </div>
        </nav>
    <form onSubmit={handleSubmit} id="product_form">
      <p className="error">{errorG}</p>
      <label>
        SKU:
        <input
          type="text"
          id="sku"
          value={product.sku}
          onChange={handleChange}
          placeholder="sku"
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          id="name"
          value={product.name}
          onChange={handleChange}
          placeholder="name"
        />
      </label>
      <label>
        Price ($):
        <input
          type="number"
          id="price"
          value={product.price}
          onChange={handleChange}
          placeholder="price"
        />
      </label>
      <label>
        Type Switcher:
        <select id="productType" value={product.type} onChange={handleChange}>
          <option value="">Type Switcher</option>
          <option value="dvd">DVD</option>
          <option value="book">Book</option>
          <option value="furniture">Furniture</option>
        </select>
      </label>
      <p className="error">{error}</p>
      {product.productType === "dvd" && (
        <label>
          Size (MB):
          <input
            type="number"
            id="size"
            value={product.size}
            onChange={handleChange}
            placeholder="size"
          />
        </label>
      )}
      {product.productType === "book" && (
        <label>
          Weight (Kg):
          <input
            type="number"
            id="weight"
            value={product.weight}
            onChange={handleChange}
            placeholder="weight"
          />
        </label>
      )}
      {product.productType === "furniture" && (
        <div>
          <label>
            Height (in):
            <input
              type="number"
              id="height"
              value={product.height}
              onChange={handleChange}
              placeholder="height"
            />
          </label>
          <label>
            Width (in):
            <input
              type="number"
              id="width"
              value={product.width}
              onChange={handleChange}
              placeholder="width"
            />
          </label>
          <label>
            Length (in):
            <input
              type="number"
              id="length"
              value={product.length}
              onChange={handleChange}
              placeholder="length"
            />
          </label>
        </div>
      )}
    </form>
    <div className='footer'>
            <p>Scandiweb Test Assignment</p>
        </div>
    </main>
  );
};

export default AddProduct;
