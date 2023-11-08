import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { lougout, update_user_products } from '../features/authSlice';
import { toast } from "react-toastify";
import { clearCart } from '../features/cartSlice';
export default function Navbar() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.cart);
    const handle_logout=()=>{
        toast.warning(`you logged out`, {
            position: "bottom-left",
        });
        dispatch(update_user_products({id:auth._id,value:cart.items}));
        
        dispatch(lougout(null));
        dispatch(clearCart());
    }
    
    const auth=useSelector(state=>state.auth);
    const cartItem=useSelector(state=>state.cart);
    return (
    <nav className='nav-bar'>
        <div>
        <Link to="/" style={{"text-decoration":"none"}}>
            <h2>Online-Shop</h2>
        </Link>
        </div>
        <div>
        <Link to="/cart" style={{"text-decoration":"none"}} className='links'>
            <div className='nav-bag'>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span className='bag-quantity'>
                    <span>{cartItem.cartTotalQuantity}</span>
                </span>
            </div>
        </Link>
        
            

        <div className='links'> 
        {console.log(auth)}   
            {//split(' ')[0]//to={`/user_details/${auth._id}`}//user
            
            auth._id?(<>
                <Link to="/my-orders" className='link1' >My orders</Link>
                {auth.Admin?<Link to="/admin/summary" className='link1'>Admin</Link>:<Link to={`/user_details/${auth._id}`}  className='link1'>User</Link>}
                <Link to="/register" className='link1' onClick={handle_logout}>Logout</Link>
                
            </>):(<>
                <Link to="/login" className='link1'>Login</Link>
                <Link to="/register" className='link1'>Register</Link>
            </>)}
        </div>
        </div>
    </nav>
  )
}
