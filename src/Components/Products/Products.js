import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { addToCart } from '../../Redux/Features/cartSlice';
import Navbar from '../Navbar/Navbar';

const Products = () => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        axios.get('/api/allProducts')
            .then(res => setProduct(res.data))
    }, []);
    const history = useNavigate();
    const updateUser = (id) => {
        const url = `/productDetails/${id}`;
        history(url);
    }
   
    const dispatch = useDispatch();
    const handelAddToCart = (product) =>{
        dispatch(addToCart(product));
    }
    return (
        <div>
            <Navbar></Navbar>
            <div style={{ background: "#F9EBC8" }}>
                <div className='container'>
                    <h3 className="py-4 fw-bold text-uppercase">Featured Products</h3>
                    <div className="row">
                        {product.length === 0 ?
                            <div className='d-flex justify-content-center' style={{ marginTop: "200px", minHeight: "90vh" }}>
                                <PulseLoader className="App" size={10} color={"red"} />
                                <PulseLoader className="App" size={10} color={"red"} />
                            </div> :
                            product.map(products =>
                                <div key={products.id} className="col-lg-3 col-md-4 col-sm-6" style={{ margin: " 0 auto 25px", }}>
                                    <div className="card-group" >
                                        <div  className="card" style={{ height: '400px' }}>
                                            <div className="card-img" onClick={()=> updateUser(products.id)}>
                                                <img src={`http://localhost:8000/Upload/ProductPhotos/` + products.image} alt="img" />
                                            </div>
                                            <div className="card-body">
                                                <p onClick={()=> updateUser(products.id)} style={{ height: "70px" }} className="product-name ">{products.name}</p>
                                                <span></span>
                                                <div className="d-flex ">
                                                    <h3 className="text-danger fw-bold">
                                                        {products.price}$</h3>
                                                    <i className="fa-solid fa-cart-shopping-fast"></i>

                                                    <i className="mt-3 text-warning ms-auto fa-solid fa-star-half-stroke">  <small className='ms-1 text-black '>4.5</small> </i>
                                                    
                                                </div>
                                                <button onClick={() => handelAddToCart(products)} className='w-100 mt-3 btn btn-primary'>Add to cart
                                                    <FontAwesomeIcon icon={faCartShopping} className="ms-2" />
                                                </button>
                                                <i className="fa-solid fa-cart-shopping-fast"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;