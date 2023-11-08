import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart, removeFromCart,increaseCart,decreaseCart, getTotal } from '../features/cartSlice';
import Payment_button from './payment_button';
import axios from 'axios';
import { toast } from 'react-toastify';
//import '../App.css'
export default function Cart() {
  const cart=useSelector(state=>state.cart);
  const auth=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const sub_but=useRef();
  const handle_remove=(cartItem)=>{
    dispatch(removeFromCart(cartItem));
  }
  const handle_clear=()=>{
    dispatch(clearCart());
  }
  const handle_increase=async(cartItem)=>{
    //console.log(cartItem.id);
    const result=await axios.get(`http://localhost:5000/api/users/get_product/${cartItem.id}`);
    if(cartItem.quantity+1>result.data.product_quantity)
    {
      toast.error(`the limit of quantity of this product is ${result.data.product_quantity}`);
      return;
    }
    dispatch(increaseCart(cartItem));
  }
  const handle_decrease=(cartItem)=>{
    dispatch(decreaseCart(cartItem));
  }
  useEffect(()=>{
    dispatch(getTotal());
  },[cart]);//,dispatch
  return (
    <div>
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.items.length===0?(
          <div className='cart-empty'>
            <p>Your cart now is empty</p>
            <div className='start-shopping'>
              <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ):
        (
          <div>
            <div className='titles'>
              <h3 className='product-title'>Product</h3>
              <h3 className='Price'>Price</h3>
              <h3 className='Quantity'>Quantity</h3>
              <h3 className='Total'>Total</h3>
            </div>

            <div className='cart-items'>
              {cart.items?.map((cartItem)=>(
                <div className='cart-item' key={cartItem.id}>
                  <div className='cart-product'>
                    <Link to={`/product_details/${cartItem.id}`}>
                      <img src={cartItem.sr.secure_url?cartItem.sr.secure_url:cartItem.sr} alt={cartItem.name}></img>
                    </Link>
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={()=>handle_remove(cartItem)}>Remove</button>
                    </div>
                  </div>
                  <div className='cart-product-price'>${cartItem.price}</div>
                  <div className='cart-product-quantity'>
                    <button onClick={()=>handle_decrease(cartItem)}>-</button>
                    <div className='count'>{cartItem.quantity}</div>
                    <button ref={sub_but} onClick={()=>handle_increase(cartItem)}>+</button>
                  </div>
                  <div className='cart-product-total-price'>${cartItem.price*cartItem.quantity}</div>

                </div>
              ))}
            </div>

            <div className='cart-summary'>
              <div>
                <button className='clear-cart' onClick={()=>handle_clear()}>Clear Cart</button>
              </div>

              <div className='other'>
                <div className='cart-checkout'>
                  <div className='subTotal'>
                    <p>SubTotal</p>
                    <p className='amount'>${cart.cartTotalPrice}</p>
                  </div>
                </div>
                <p className='taxes'>Taxes and shipping calculated at checkout</p>
                {auth._id?<Payment_button cartItems={cart.items}/>:<button className='check1' onClick={()=>{navigate("/login")}}>Login to checkout</button>}
                
                <div className='continue-shopping'>
                  <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
