import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { update_user_products } from "../features/authSlice";
import { useEffect, useState } from "react";
//import { useScrollTrigger } from "@mui/material";

const CheckoutSuccess = () => {
    const dispatch=useDispatch();
    const auth=useSelector(state=>state.auth);
    const arr=[];
    //dispatch(clearCart());
    localStorage.setItem("cartItems",JSON.stringify(arr));
    localStorage.setItem("ids",JSON.stringify(arr));
    localStorage.setItem("clear","clear");
    //useEffect(()=>{
    //    window.location.reload(false);
    //},[localStorage.getItem("cartItems")]);
    //setTimeout(()=>{
    //    window.location.reload();
    //},100000000);

    //window.location.reload(false);
    //dispatch(update_user_products({id:auth._id,value:[]}));
    //update the use products after checkout


    //dispatch(clearCart(null));
    return (
        <div className="checkout-success-div">
            <h1>checkout success</h1>
            <h2>Thanks for your order!</h2>
            <p>
                We appreciate your business!
                If you have any questions, please email
                <a href="mailto:orders@example.com"> orders@example.com</a>.
            </p>
        </div>
    );
}

export default CheckoutSuccess;