import React, { useEffect } from "react";
import "../products.css";
import ProductCard from "../productCard";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import {useDispatch, useSelector} from 'react-redux';
import { listProducts } from "../actions/productActions";
export default function Products(){ 
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading,error,products} = productList;
    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch]);
    return (<div className="header">
        {loading?<LoadingBox></LoadingBox>
        :
        error?<MessageBox variant="danger">{error}</MessageBox>:
        <div className="container">
        <div className="container">
            <h2 className="title">Products</h2>
            <div className="row">
                {products.map(product =>{
                    return <ProductCard key={product._id} product={product}/>
                })}
            </div>
        </div>
        </div>
        }
    </div>);
}
