import React from 'react'
import axios from 'axios'
import { url } from '../features/api'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, setCart, updateCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { update_user_products } from '../features/authSlice';
export default function Payment_button({cartItems}) {
    //const dispatch=useDispatch();
    const auth=useSelector(state=>state.auth);
    const cart=useSelector(state=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handle_pay=async(e)=>{
        //e.preventDefault();
        //pending
        //console.log(cart.ids);
        const token=localStorage.getItem("token");
        const instance = axios.create({
            baseURL: 'http://localhost:5000/',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const result=await instance.post(`http://localhost:5000/api/products/get_the_total_cart`,cart.ids);
        console.log(result);

        if(!result){console.log(result);return;}

        //cartItems=result.data;
        //console.log("cartItems: ",cartItems);
        //console.log("result.data: ",result.data);
        const mp=new Map();
        for(var i=0;i<cartItems.length;i++)
        {
            mp.set(cartItems[i].id,cartItems[i].quantity);
        }
        //console.log(mp);
        //console.log(mp.get("65293d0742c1297cdbc9a458"));
        const newAr=result.data.filter((element)=>element.product_quantity!=0);//action.payload.id!==element.id);
        const newArr=newAr.map((item)=>{
            return {
                id:item._id,
                name:item.name,
                brand:item.brand,
                sr:item.sr.secure_url,
                price:item.price,
                desc:item.desc,
                quantity:Math.min(mp.get(item._id),item.product_quantity)
            }
        })

        //localStorage.setItem("quantity",JSON.stringify(mp));
        /*const mp=cart.mp?cart.map:0;
        //mp.set("n1","1");
        //mp.set("n2","2");
        if(mp!=0){
            const firstEntry = mp.entries()?mp.entries.next():0;
            const firstKey = firstEntry.value?firstEntry.value[0]:0;
            const firstValue = firstEntry.value?firstEntry.value[1]:0;
            console.log(firstKey," ",firstValue);
        }*/
        //console.log(cart.mp);
        //console.log(firstKey);
        console.log("new arr: ",newArr);
        //alert(newArr.length);
        //const obj=[{name:'oppo',quantity:'1',sr:'https://res.cloudinary.com/dnpyllrus/image/upload/v1697201613/nsxub9img12ntmxgwqyq.jpg',id:'65293d0742c1297cdbc9a458',price:'11',desc:'ss',brand:'s'}]
        cartItems=newArr;
        dispatch(setCart(cartItems));
        //dispatch(update_user_products({id:auth._id,value:cart.items}));
        //const cartUpdated=useSelector(state=>state.cart);
        if(cartItems.length==0)
        {
            navigate("/cart");
            return;
        }
        //update the cart items
        axios.post(`http://localhost:5000/api/stripe/create-checkout-session`,{
            cartItems,
            userId:auth._id
        })
        .then(res=>{
            //console.log(res.data.url);
            
            if(res.data.url)window.location.href=res.data.url;
        })
        .catch((err)=>{console.log(err.message)});
    }
    return (
        <div>
            <button onClick={handle_pay} className='check'>Checkout</button>
        </div>
    )
}
