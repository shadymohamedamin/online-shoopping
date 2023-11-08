import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
//import { addToCart, getTotal } from '../../features/cartSlice';
export default function OrderDetails() {
    const params=useParams();
    const [order,setOrder]=useState({});
    /*useEffect(()=>{
            async function fetch_last(){
                try{
                const token=localStorage.getItem("token");
                //console.log(token);
                const instance=axios.create({
                    baseURL:"http://localhost:5000/",
                    headers:{Authorization:`Bearer ${token}`}
                });
                const result=await instance.get(`/api/orders/get_order/${params.id}`); 
                //console.log("transaction: ",result.data);

                setOrder(result.data);
                console.log("product1: ",result);
                console.log("product2: ",order);
                //return result.data;
                }
                catch(err)
                {
                    console.log(err);
                }
            
            }
            fetch_last();
    },[]);*/
    useEffect(()=>{
      const token=localStorage.getItem("token");
                //console.log(token);
      const instance=axios.create({
        baseURL:"http://localhost:5000/",
        headers:{Authorization:`Bearer ${token}`}
      });
      instance.get(`/api/orders/get_order/${params.id}`)
      .then(res=>{
        setOrder(res.data);
        console.log(order);
      })
      .catch((err)=>{
        console.log(err);
      })
    },[]);
    
    //const obj=fetch_last();
    //console.log("result",result)
    const dispatch=useDispatch();
    
    //const cart=useSelector(state=>state.cart);
    //useEffect(()=>{
    //    dispatch(getTotal());
    //  },[cart]);
    /*
    <StyledProduct>
            <ProductContainer>
                <ImageContainer>
                    
                </ImageContainer>
                <ProductDetail>
                    
                    
                </ProductDetail>
            </ProductContainer>
            
    </StyledProduct>
    */
    const [prod,setProd]=useState();
    return (
        
        <StyledOrder>
          <OrderContainer>
            <Tan>
            <h2>Order Details</h2>
            <h4>{moment(order?.createdAt)?.fromNow()}</h4>
            </Tan>
            
            
            <h3>Delivery Status:{" "}
              
              {order.delivery_status=="pending"?<Pending>Pending</Pending>:null}
              {order.delivery_status=="delivered"?<Delivered>delivered</Delivered>:null}
              {order.delivery_status=="dispatched"?<Dispatched>dispatched</Dispatched>:null}
            </h3>
            <h3>Ordered Products</h3>
            <Items>
              {
                order.products?.map((item)=>{
                  
                  /*axios.get(`http://localhost:5000/api/users/get_product/${item._id}`)
                  .then(res=>setProd(res.data))
                  .catch(err=>console.log(err));*/
                  return(
                    <Item key={item._id}>
                      <img src={item.sr} alt='image' width={50} height={50}></img>
                      <span>{item?.name}</span>
                      <span>{item?.quantity}</span>
                      <span>${(item?.price)?.toLocaleString()}</span>
                    </Item>

                  )
                })
                  
                
              }
            </Items>
            <div>
              <h3>Total Price</h3>
              <p>{"$"+(order.total/100).toLocaleString()}</p>
            </div>
            <div>
              <h3>Shipping Details</h3>
              <p>Customer: {order?.shipping?.name}</p>
              <p>City: {order?.shipping?.address?.city}</p>
              <p>Email: {order?.shipping?.email}</p>
              <p>Phone: {order?.shipping?.phone}</p>
            </div>
          </OrderContainer>
        </StyledOrder>
    )
};


const StyledOrder=styled.div`
margin:3rem;
display:flex;
justify-content:center;
h3{
  margin:1.5rem 0 0.5rem 0;
}
`;
const Tan=styled.div`
display:flex;
justify-content: space-between;

`;
const OrderContainer=styled.div`
max-width:500px;
width:100%;
height:auto;

box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px;
border-radius:5px;
padding:2rem;
`;

const Items=styled.div`
span{
  margin-right:1.5rem;
  &:first-child{
    font-weight:bold;
  }
}
`;
const Item=styled.li`
margin-left:0.5rem;
margin-bottom:0.5rem;
img{
  margin-right:2rem;
  
}
`;

const Pending=styled.span`
padding:3px 5px;
color:rgb(253,181,40);
background-color:rgb(253,181,40,0.12);
border-radius:3px;
font-size:14px;
`;
const Dispatched=styled.span`
padding:3px 5px;
color:rgb(255,77,73);
background-color:rgba(255,77,73,0.12);
border-radius:3px;
font-size:14px;
`;
/*#4b70e2;*/
const Delivered=styled.span`
padding:3px 5px;
color:rgb(75, 112, 226);
background-color:rgba(75, 112, 226,0.12);
border-radius:3px;
font-size:14px;
`;


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
