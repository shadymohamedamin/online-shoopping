import React,{useState,useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getTotal } from '../../features/cartSlice';
import { toast } from 'react-toastify';
export default function ProductDetails() {
    const cart=useSelector(state=>state.cart);
    const sub_but=useRef();
    const params=useParams();
    const [product,setProduct]=useState({
        name:"",
        brand:"",
        sr:"",
        desc:"",
        price:""
    });
    useEffect(()=>{
            async function fetch_last(){
                try{
                const token=localStorage.getItem("token");
                //console.log(token);
                const instance=axios.create({
                    baseURL:"http://localhost:5000/",
                    headers:{Authorization:`Bearer ${token}`}
                });
                const result=await instance.get(`/api/users/get_product/${params.id}`); 
                //console.log("transaction: ",result.data);
                setProduct(result.data);
                const indexItem=cart.items.findIndex((element)=>(element.id===result.data._id));
                if(indexItem>=0&&cart.items[indexItem].quantity>=product.product_quantity||product.product_quantity==0)
                {
                    sub_but.current.disabled=true;
                    sub_but.current.style.background="gray";
                }
                console.log("product: ",result);
                }
                catch(err)
                {
                    console.log(err);
                }
            
            }
            fetch_last();
    },[]);
    const dispatch=useDispatch();
    const handleAddToCart=(product)=>{

        const newProduct={
            name:product.name,
            brand:product.brand,
            desc:product.desc,
            price:product.price,
            id:product._id,
            sr:product.sr,
            product_quantity:product.product_quantity
        }
        const indexItem=cart.items.findIndex((element)=>(element.id===product._id));
        if(indexItem>=0&&cart.items[indexItem].quantity>=product.product_quantity||product.product_quantity==0)
        {
            //sub_but.current.disabled=true;
            toast.error("No enough quantity of this product");
            sub_but.current.style.background="gray";
            return;
        }
        dispatch(addToCart(newProduct));
    }
    
    useEffect(()=>{
        dispatch(getTotal());
      },[cart]);
     
    return (
        <StyledProduct>
            <ProductContainer>
                <ImageContainer>
                    <img src={product.sr.secure_url}></img>
                </ImageContainer>
                <ProductDetail>
                    <h3>{product.name}</h3>
                    <p><spane>Category: </spane>{product.brand}</p>
                    <p><spane>Description: </spane>{product.desc}</p>
                    <p><spane>Quantity: </spane>{product.product_quantity}</p>
                    <Price>${product.price.toLocaleString()}</Price>
                    <button ref={sub_but} className='product-add-to-cart' onClick={()=>handleAddToCart(product)}>Add To Cart</button>
                </ProductDetail>
            </ProductContainer>
            
        </StyledProduct>
    )
};


const StyledProduct=styled.div`
margin:3rem;
display:flex;
justify-content:center;
`;

const ProductContainer=styled.div`
max-width:500px;
width:100%;
height:auto;
display:flex;
box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px;
border-radius:5px;
padding:2rem;
`;

const ImageContainer=styled.div`
flex:1;
img{
    width:100%;
}
`


const ProductDetail=styled.div`
flex:2;
margin-left:2rem;
h3{
    font-size:35px;

}
p span{
    font-weight:bold;
}
`;

const Price=styled.div`
margin:1rem 0;
font-weight:bold;
font-size:25px;
`;
