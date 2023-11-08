import React, { useEffect, useState,useRef } from 'react'
import { useGetAllProductsQuery } from '../features/productApi'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getTotal } from '../features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
//import e from 'express';
//import styled from 'styled-component';


export default function Home() {
  const {data,error,isLoading}=useGetAllProductsQuery();
  const cart=useSelector(state=>state.cart);
  const product=useSelector(state=>state.product);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  //const mp=localStorage.getItem("quantity")?JSON.parse(localStorage.getItem("quantity")):new Map();
  const sub_but=useRef();//<HTMLButtonElement>(null);
  //const [dis,setDis]=useState(false);
  const [arr,setArr]=useState([]);
  useEffect(()=>{
    setArr(product.items);
  },[product.items])
  const [type,setType]=useState("name");
  //setArr(product.items)
  const submit=async(product)=>{
    //const product=await axios.get(`http://localhost:5000/api/users/get_product/${product.id}`);
    //if(product)
    //e.preventDefault();
    //if(mp.get(product.id))
    //{
    //  mp.set(product.id,mp.get(product.id)+1);
    //}
    //else
    //{
    //  mp.set(product.id,1);
    //}
    //localStorage.setItem("quantity",JSON.stringify(mp));
    console.log(product);
    
    const indexItem=cart.items.findIndex((element)=>(element.id===product.id));
    if(indexItem>=0&&cart.items[indexItem].quantity>=product.product_quantity||product.product_quantity==0)
    {
      //if(sub_but.current)sub_but.current.disabled=true;
      //sub_but.current.style.background="gray";
      toast.error("No enough quantity of this product");
      return;
    }
    dispatch(addToCart(product));
    //navigate("/cart");
  }
  useEffect(()=>{
    dispatch(getTotal());
  },[cart]);
  const [sear,SetSear]=useState("");
  const handle_search=async(e)=>{
    //alert(e.target.value);
    const obj={
      name:e.target.value,
      type:type,
    }
    //alert(obj.type);
    const result=await axios.post('http://localhost:5000/api/products/category',obj);
    //alert(arr.length)
    setArr(result.data);
  }
  var search_but=useRef(null);
  if(search_but.current)search_but.current.placeholder="Search By Name";
  //error?<p style={{"color":"red"}}>error</p>
  useEffect(()=>{
    if(search_but)search_but.current.placeholder=`Search By ${type}`;
  },[type]);
  return (
    <div className='home-container'>
      <h2>New Arrivals</h2>
      <div className='search_by_category'>
      <select className='general_search' onChange={(e)=>setType(e.target.value)}>
                    <option value="name">Search By Name</option>
                    
                    <option value="category">Search By Category</option>
                    <option value="price">Search By Price</option>
                    <option value="description">Search By Description</option>
      </select>
      <input ref={search_but} className='input_of_search' type='text' placeholder='search by category' onChange={(e)=>{handle_search(e)}}></input>
      </div>
      {arr.length==0?<p>loading...</p>:

          <>
          
          
          
          <div className='products'>
            {arr?.map((product)=>{
              return(
              <div key={product.id} className='product'>
                
                <h3>{product.name}</h3>
                <Link to={`/product_details/${product.id}`}>
                  <img src={product.sr.secure_url?product.sr.secure_url:product.sr} width="250" height="200"></img>
                </Link>
                
                <div className='details'>
                  <span className='sp1'>{product.desc}</span>
                  <span>${product.price}</span>
                </div>

                <button  ref={sub_but}  onClick={()=>submit(product)}>Add to cart</button>
              </div>
              
            )} ) }
          </div>
        </>
      }
    </div>
    
  )
}

/*const INP=styled.div`
flex:display;
justify-content:center;
align-items:center;
`*/

