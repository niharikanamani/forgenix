import React from 'react';
function HomeScreen(){
    return (<div className="header">
    <div className="container">
        <div className="main-row">
         <div className="col-2">
             <h1>Welcome to <br/> For<span>genix</span></h1>
             <p>It's Our mission to help people live a better, healthier, and wholesome life by going back to basics and bring healthy tasty organic food and groceries.</p>
             <a href="/products" class="btn">Explore Now &#8594;</a>
         </div>
         <div className="col-2">
             <img id="homeimg"src="./images/bgc.jpg" alt="leafImage"/>
         </div>
     </div>
    </div>
 </div>);
}
export default HomeScreen;