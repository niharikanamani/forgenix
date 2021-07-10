import React from "react";
import {Link} from 'react-router-dom';
function productcard(props){
    const {product} = props;
    return (<div class="col-4">
         <Link to={`products/${product._id}`}><img src={product.imgUrl} alt={product.title}/></Link>
         <Link to={`products/${product._id}`}><h4>{product.title}</h4></Link>
</div>); 
}
export default productcard;