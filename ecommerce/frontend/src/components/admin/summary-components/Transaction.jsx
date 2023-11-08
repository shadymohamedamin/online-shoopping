import styled from "styled-components";
import { useState,useEffect } from "react";
import axios from 'axios';
import moment from 'moment';

import React from 'react'

export default function Transaction() {
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
            async function fetch_last(){
              try{
                const token=localStorage.getItem("token");
                //console.log(token);
                const instance=axios.create({
                  baseURL:"http://localhost:5000/",
                  headers:{Authorization:`Bearer ${token}`}
                });
                const result=await instance.get("/api/orders/last/?new=true");
                //console.log("transaction: ",result.data);
                setOrders(result.data);
              }
              catch(err)
              {
                console.log(err);
              }
              
            }
            fetch_last();
      },[]);
  //console.log(orders);    
  return (
    <StyledTransaction>
        <h3>Latest Transaction</h3>
        {
            orders.map((item,index)=>{
                
                return (
                <TransactionOne key={index}>
                    <p>{item.shipping.name.split(' ')[0]}</p>
                    <p>${(item.total/100).toLocaleString()}</p>
                    <p>{moment(item.createdAt).fromNow()}</p>
                    
                    
                </TransactionOne>)

            })
        }
    </StyledTransaction>
  )
}


const StyledTransaction=styled.div`
background:rgb(48,51,78);
color:rgba(234,234,255,0.87);
padding:1rem;
border-radius:5px;
`;

const TransactionOne=styled.div`
display:flex;
font-size:14px;
margin-top:1rem;
padding:0.5rem;
border-radius:3px;
background:rgba(38,198,249,0.12);
p{
    flex:1;
}
&:nth-child(even){
    background:rgba(102,108,255,0.12);
}

`
