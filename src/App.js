import React, { useState } from 'react';
import Navbar from "./navbar";
import { BrowserRouter } from 'react-router-dom'; 
import { Route } from 'react-router-dom';
import Footer from "./footer";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import AddtoScreen from './screens/AddtoScreen';
import {signout} from './actions/userActions';
import CartScreen from './screens/CartScreen';
import {useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { Link } from "react-router-dom";
import "./home.css";
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import OrderScreen from './screens/OrderScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
function App() {
  const cart = useSelector((state)=>state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state)=>state.userSignin);
  const {userInfo} = userSignin;
  // console.log(userSignin);
  // console.log(userInfo);()
  const [state,setState] = useState("block");
  function handletoggle(){
      if(state === "block") setState("none");
      else setState("block");
  }
  const dispatch = useDispatch();
  const signoutHandler = () => {
     dispatch(signout());
  }
  return (
    <BrowserRouter>
        <div><header>
        <div className="header">
        <div className="container">
             <div className="navbar">
                <div className="logo">
                    <img src="./images/logo.png" style={{"width": "184px"},{ "height": "97px"}} alt="logoimage"/>
                </div>
                <nav>
                    <ul id="menuitems" style={{display:state}}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="./products">Products</Link></li>
                        <li>
                             {userInfo?(<>
                             <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</Link>
                               <Link to="#signout" onClick={signoutHandler}>Sign Out</Link></>):(<Link to="/signin">Signin</Link>)}
                            {/* <Link to="./signin">Signin</Link> */}
                        </li>
                        <li className="icons">
                        <Link to="/cart"><img className="mainbag" src="./images/shopping-bag.png" style={{"width":"30px"} ,{ "height":"30px" }} alt="bagimg"/>{cartItems.length}</Link>
                        </li>
                    </ul>
                </nav>
                <div className="next-icons">
                    <Link to="/cart"><img className="bag" src="./images/shopping-bag.png" style={{"width":"30px"} ,{ "height":"30px" }} alt="bagimg"/>{cartItems.length}</Link>
                <img onClick={handletoggle} className="menu" src="./images/menu.png" alt="img"/>
                </div>
            </div>
        </div>
    </div></header>
    
          <main>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/products/:id" component={AddtoScreen} ></Route>
            <Route path="/products" component={ProductScreen} exact></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </main> 
          <footer><Footer/></footer>
        </div>
  </BrowserRouter>
  );
}

export default App;
