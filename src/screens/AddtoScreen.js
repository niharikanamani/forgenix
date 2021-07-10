import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import "../addtoCart.css";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
export default function AddtoCart(props){
    const dispatch = useDispatch();
    const productId = (props.match.params.id);
    const [qty,setQty] = useState(1);
    const productDetails = useSelector((state)=>state.productDetails);
    const {loading,error,product} = productDetails;
    useEffect(()=>{
        dispatch(detailsProduct(productId));
    },[dispatch,productId]);
    const addToCartHandler = (event) =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
        event.preventDefault();
    }
    return (<div className="header">
        {loading?(<LoadingBox></LoadingBox>)
        :
        error?(<MessageBox variant="danger">{error}</MessageBox>):
        (<div className="header">
        <div className="container">
        <div className="container">
           <div className="single-product-detail">
              <h2 className="title">{product.title}</h2>
              <div className="row">
                  <div className="col-2">
                      <img id = "proimg" src={product.imgUrl} alt={product.name}/>
                   </div>
                  <div className="col-2">
                        <h3>{product.description}</h3>
                        <h4 >Price &#x20b9; {product.price} = &#x20b9; {product.price}{"/"} {product.quantity}</h4>
                        {product.countInStock > 0 && (
                            <>
                            <div>Qty</div>
                           <div>
                            <select value={qty}
                            onChange={(e) => setQty(e.target.value)}>
                            {
                                [...Array(product.countInStock).keys()].map((x)=>(<option value={x+1}>{x+1}</option>))
                            }
                            </select>
                        </div>
                        <a onClick={addToCartHandler} href="/" className="btn">Add to Cart &#8594;</a>
                            </>
                        )}
                   </div>         
              </div>
           </div>
        </div>
        </div>
    </div>)
        }
    </div>
    );
}
