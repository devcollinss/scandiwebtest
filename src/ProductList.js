import React, { useEffect, useState } from 'react';
import AddIcon from './add.svg';
import Deletecon from './bx-trash.svg';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [check, setCheck] = useState([{}]);
    const [product, setProduct] = useState([]);
    const [checkedIds, setCheckedIds] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://vssdf.000webhostapp.com/product.php')
        .then(response => {
            setProduct(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    // const handleCheck = (e) => {
    //     // setCheck([...check, {'id': e.target.value}])
    //     setTimeout(() => {
            
    //     }, 2000)
    // }
    const deleteCheck = document.querySelectorAll('.delete-checkbox');

    const handleCheck = (e) => {
        const id = parseInt(e.target.value);
        const isChecked = e.target.checked;
      
        if (isChecked) {
          setCheckedIds(prevCheckedIds => [...prevCheckedIds, id]);
        } else {
          setCheckedIds(prevCheckedIds => prevCheckedIds.filter(checkedId => checkedId !== id));
        }
      };
    

      const massDelete = () => {
        axios.post('https://vssdf.000webhostapp.com/deleteProduct.php', { ids: checkedIds })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      };

      


  return (
    <main>
        <nav>
            <div><h1>Product List</h1></div>
            <div className='btn'>
                {/* <Link to='/addproduct'>Add <img src={AddIcon} /></Link> */}
                <button onClick={()=> navigate("/addproduct")}>Add <img src={AddIcon} /></button>
                <button onClick={massDelete}>Mass Delete <img src={Deletecon} /></button>
            </div>
        </nav>
        <div className='productLists'>
            {product.map((prod) => (
                <div className='product' key={prod.id} >
                    <input type='checkbox' className='delete-checkbox' value={prod.id} onClick={handleCheck} />
                    <h2>{prod.sku}</h2>
                    <h2>{prod.name}</h2>
                    <h2>{prod.price}</h2>
                    <p>{(prod.type === 'dvd') ? `Size: ${prod.size}` : ((prod.type === 'book') ? `Weight: ${prod.weight}` : (prod.type === 'furniture') ? `Dimension: ${prod.height}x${prod.width}x${prod.length}` : '') }</p>
                </div>

            ))}
        </div>
        <div className='footer'>
            <p>Scandiweb Test Assignment</p>
        </div>
    </main>
  )
}

export default ProductList