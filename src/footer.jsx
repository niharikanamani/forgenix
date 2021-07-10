import React from "react";
function footer(){
    let date = new Date().getFullYear();
    // console.log(date);
    return(<div class="footer">
    <p class="footer-text">Copyrights &copy; reserved {date} - forgenix.in</p>
</div>);
}
export default footer;