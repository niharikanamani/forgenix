import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../CheckoutSteps.js';
import {Link} from 'react-router-dom';
import { createOrder } from '../actions/orderActions.js';
import { ORDER_CREATE_RESET } from '../constants/orderConstants.js';
import LoadingBox from '../LoadingBox.js';
import MessageBox from '../MessageBox.js';
export default function PlaceOrderScreen(props){
    const cart = useSelector((state)=>state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading,success,error,order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a,c)=>a+c.qty*c.price,0));
    cart.shippingPrice = cart.itemsPrice > 100?toPrice(0):toPrice(10);
    cart.taxPrice = toPrice(0.15*cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice+cart.shippingPrice+cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () =>{
        dispatch(createOrder({...cart,orderItems:cart.cartItems}));
        
    };
    useEffect(()=>{
        if(success){
            props.history.push(`/order/${order._id}`,order);
            dispatch({type:ORDER_CREATE_RESET});
        }
    },[dispatch,order,props.history,success]);
    // console.log("****************",order)
    return(
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className='container'>
                <div className="row">
                   <div className="ship col-2">
                   <div className='card card-body'>
                        <h2>Order Items</h2>
                                 <div> <table>
        <tr>
            <th>Products</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Total</th>
        </tr>
        {cart.cartItems.map((item)=>(
           <>
           <tr>
            <td>
                <div class="container">
                    <div class="card-info-item">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>

                        <p> <span class="just">Price: </span><span class="WebRupee">Rs.</span>{item.price}</p>
                    </div>
                </div>
            </td>
            <td>{item.qty}</td>
            <td><span class="WebRupee">Rs.</span> {item.price}</td>
            <td>{item.qty} x <span class="WebRupee">Rs.</span>{item.price} = <span class="WebRupee">Rs.</span>{item.qty*item.price}</td>
        </tr>
           </>
        ))}
        
    </table>
    <div class="total-price">
        <h2>Order Summary</h2>
        <table>           
            <tr>
                <tr>Items : ${cart.itemsPrice.toFixed(2)}</tr>
                <tr>Shipping : ${cart.shippingPrice.toFixed(2)}</tr>
                <tr>Tax : ${cart.taxPrice.toFixed(2)}</tr>
                <tr><strong>Order Total : ${cart.totalPrice.toFixed(2)}</strong></tr>
                
            </tr>
        </table>

    </div>
    </div>
  </div>
  </div>

                   <div className="ship col-2">
                             <div className='card card-body'>
                                 <h2>Shipping</h2>
                                 <p>
                                     <strong>Name:</strong>
                                     {cart.shippingAddress.fullName}<br/>
                                     <strong>Address:</strong>
                                     {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                                 </p>
                             </div>
                             <div className='card card-body'>
                                 <h2>Payment</h2>
                                 <p>
                                     <strong>Method:</strong>
                                     {cart.paymentMethod}
                                 </p>
                             </div>
                             <div><button
                                 type="button"
                                 onClick={placeOrderHandler}
                                 className="btn"
                                 disabled={cart.cartItems.length === 0}
                             >Place Order</button>
                             {loading && <LoadingBox></LoadingBox>}
                             {error && <MessageBox variant="danger">{error}</MessageBox>}
                             </div>
                   </div>
             </div>
          </div>
        </div>
    );
}