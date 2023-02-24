import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [product, setProduct] = useState([]);
    const [checkedIds, setCheckedIds] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://scandiwebtest.moe-enugustate.com/product.php')
        .then(response => {
            setProduct(response.data);
        })
        .catch(error => {
            console.log(error)
        })
    }, [product])


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
        const deleteUrl = 'https://scandiwebtest.moe-enugustate.com/delete.php';

        axios.post(deleteUrl, { ids: checkedIds }, {
          mode: 'cors'
        })
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
                <button onClick={()=> navigate("/addproduct")}>ADD</button>
                <button onClick={massDelete}>MASS DELETE</button>
            </div>
        </nav>
        <div className='productLists'>
            {product.map((prod) => (
                <div className='product' key={prod.id} >
                    <input type='checkbox' className='delete-checkbox' value={prod.id} onClick={handleCheck} />
                    <h2>{prod.sku}</h2>
                    <h2>{prod.name}</h2>
                    <h2>{prod.price}</h2>
                    <p>{(prod.type === 'dvd') ? `Size: ${prod.size}MB` : ((prod.type === 'book') ? `Weight: ${prod.weight}KG` : (prod.type === 'furniture') ? `Dimension: ${prod.height}x${prod.width}x${prod.length}` : '') }</p>
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