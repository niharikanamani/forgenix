import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
function Navbar(props){
    const [state,setState] = useState("block");
      function handleToggle (){
       setState("none");
    };
    return (<div className="header">
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
                             {/* {props.userInfo}?(<Link to="#">{props.userInfo.name}</Link>):(<Link to="./signin">Signin</Link>)
                            ; */}
                            <Link to="./signin">Signin</Link>
                        </li>
                        
                    </ul>
                </nav>
                <div className="icons">
                    <Link to="/cart"><img className="bag" src="./images/shopping-bag.png" style={{"width":"30px"} ,{ "height":"30px" }} alt="bagimg"/>{props.count}</Link>
                  <img onClick={handleToggle} className="menu menuitems" src="./images/menu.png" alt="img"/>
                </div>
            </div>
        </div>
    </div>);
}
export default Navbar;