import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {useDispatch, useSelector} from 'react-redux';
import "../checkout.css";
import {Link} from 'react-router-dom';
import MessageBox from "../MessageBox";
export default function CartScreen(props){
    const productId = (props.match.params.id);
    const qty = props.location.search ? (props.location.search.split('=')[1]):1;
    const cart = useSelector((state)=>state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();
    useEffect(()=>{
         if(productId){
             dispatch(addToCart(productId,qty));
         }
    },[dispatch,productId,qty]);
    const removeFromCartHandler= (id) => {
         //delete action
         dispatch(removeFromCart(id));
    }
    const checkoutHandler = (event) =>{
        props.history.push('/signin?redirect=shipping');
        event.preventDefault();

    };
    return (<div class="container small-container cart-page">
    <h1>Shopping Cart</h1>
    {cartItems.length === 0?<MessageBox ><><p className="empty">Cart is Empty.</p></><Link to="/products"><p className="shopping btn">Go Shopping &#8594;</p></Link></MessageBox>:(<div className="container"> <table>
        <tr>
            <th>Item</th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Amount</th>
        </tr>
        {cartItems.map((item)=>(
           <>
           <tr>
            <td><Link onClick={()=> removeFromCartHandler(item.product)}href="#" class="remove"><img src="./images/remove.png" alt=""/></Link></td>
            <td>
                <div class="card-info">
                    <div>
                        <img src={item.image}
                        alt = {item.name}
                        className="small"></img>
                    </div>
                    <div class="card-info-item">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>{
                                [...Array(item.countInStock).keys()].map((x)=>(<option value={x+1}>{x+1}</option>))
                            }</select>
                        <p> <span class="just">Price: </span><span class="WebRupee">Rs.</span>{item.price}</p>
                    </div>
                </div>
            </td>
            <td>{item.qty}</td>
            <td><span class="WebRupee">Rs.</span> {item.price}</td>
        </tr>
           </>
        ))}
        
    </table>
    <div class="total-price">
        <table>

            <tr>
                <td>Total : </td>
                <td>({cartItems.reduce((a,c)=>a+c.qty,0)} items) : <span class="WebRupee">Rs.</span>{cartItems.reduce((a,c)=>a+c.price*c.qty,0)}</td>
            </tr>
        </table>

    </div>
    <div class="payment">
        <a href="/" onClick={checkoutHandler} disabled={cartItems.length===0} class="btn">Proceed to Checkout&#8594;</a>
    </div></div>)}
</div>);
}