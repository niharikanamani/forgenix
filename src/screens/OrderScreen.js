import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import "../paynow.css";
import LoadingBox from '../LoadingBox.js';
import MessageBox from '../MessageBox.js';
import detailsOrder, { payOrder } from "../actions/orderActions";
import Axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen(props){
   
    const orderId = props.match.params.id;
    const [sdkReady,setSdkReady] = useState(false);
    const orderDetails = useSelector((state)=>state.orderDetails);
    const {order,loading,error} = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const {loading:loadingPay,error:errorPay,success:successPay} = orderPay;
    const dispatch = useDispatch();   
    
    useEffect(()=>{ 
        const addRazorPayScript = async() => {
            const{data} = await Axios.post('/api/config/razorpay');
            console.log("data",data); 
            const script  = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.type='text/javascript';
            script.onload= () =>{
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if(!order || successPay || (order && order._id !== orderId)){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(detailsOrder(orderId));
        }
        else{
            if(!order.isPaid){
                if(!window.razorpay){
                    addRazorPayScript();
                }
                else{
                    setSdkReady(true);
                }
            }
        }
    },[dispatch,order,orderId,sdkReady,successPay]);
    const successPaymentHandler = (paymentResult) =>{
       dispatch(payOrder(order,paymentResult));
    };
    return loading?(<LoadingBox></LoadingBox>):error?(<MessageBox variant="danger">{error}</MessageBox>):(
        <div>
            <div className='container'>
            <h1>Order {order._id}</h1>
                <div className=" row-pay row">
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
        {order.orderItems.map((item)=>(
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
                <tr>Items : ${order.itemsPrice.toFixed(2)}</tr>
                <tr>Shipping : ${order.shippingPrice.toFixed(2)}</tr>
                <tr>Tax : ${order.taxPrice.toFixed(2)}</tr>
                <tr><strong>Order Total : ${order.totalPrice.toFixed(2)}</strong></tr>
                <tr>
                    {!sdkReady ? (<LoadingBox></LoadingBox>):(<>
                        {
                            errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)
                        }
                        {
                            loadingPay && (<LoadingBox></LoadingBox>)
                        }
                    </>)}
                </tr>
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
                                     {order.shippingAddress.fullName}<br/>
                                     <strong>Address:</strong>
                                     {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                                 </p>
                                 {order.isDelivered?(<MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>):(<MessageBox variant="danger">Not Delivered</MessageBox>)}
                             </div>
                             <div className='card card-body'>
                                 <h2>Payment</h2>
                                 <p>
                                     <strong>Method:</strong>
                                     {order.paymentMethod}
                                 </p>
                                 {order.isPaid?(<MessageBox variant="success">Paid at {order.paidAt}</MessageBox>):(<MessageBox variant="danger"> Not Paid</MessageBox>)}
                             </div>
                            
                   </div>
             </div>
          </div>
        </div>
    );
}