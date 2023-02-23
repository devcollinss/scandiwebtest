import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";



const RouterSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/scandiwebtest/" element={<ProductList />} />
                <Route path="/scandiwebtest/addproduct" element={<AddProduct />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterSwitch;