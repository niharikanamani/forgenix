import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../CheckoutSteps';
import "../pay.css";
export default function PaymentMethodScreen(props){
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!shippingAddress.address){
        props.history.push('/shipping');
    }
    const [paymentMethod,setPaymentMethod] = useState('RazorPay');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        // e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    };
    return (
        <div className="pay">
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="payform" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="razorpay" name="paymentMethod" value="RazorPay" required checked onChange={(e)=>setPaymentMethod(e.target.value)}>

                        </input>
                        <label htmlFor="razorpay">RazorPay</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" name="paymentMethod" value="PayPal" required onChange={(e)=>setPaymentMethod(e.target.value)}>

                        </input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <button className="btn" type="submit">Continue</button>
            </form>
        </div>
    );
};