import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
export default function AllTimeData() {
    const items=useSelector(state=>state.product.items);
    //console.log("items: ",items);
    const [users,setUsers]=useState(0);
    const [orders,setOrders]=useState([]);
    const [earnings,setEarnings]=useState(0);
    
    useEffect(()=>{
        async function fetch_number_users(){
            try{
                const token=localStorage.getItem("token");
                const instance=axios.create({
                    baseURL:"http://localhost:5000/",
                    headers:{Authorization:`Bearer ${token}`}
                });
                const result=await instance.get("/api/users/numberOfUsers");
                setUsers(result.data);
                console.log("numberofusers: ",result.data);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        fetch_number_users();

        async function fetch_number_orders(){
            try{
                const token=localStorage.getItem("token");
                const instance=axios.create({
                    baseURL:"http://localhost:5000/",
                    headers:{Authorization:`Bearer ${token}`}
                });
                const result=await instance.get("/api/orders/numberOfOrders");
                setOrders(result.data);
                console.log("numberoforders: ",result.data);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        fetch_number_orders();

        async function fetch_earning(){
            try{
                const token=localStorage.getItem("token");
                const instance=axios.create({
                    baseURL:"http://localhost:5000/",
                    headers:{Authorization:`Bearer ${token}`}
                });
                const result=await instance.get("/api/orders/earning");
                setEarnings(result.data[0].total/100);
                console.log("earning: ",result.data);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        fetch_earning();
    },[]);
  return (
    <Main>
        <h3>All Time</h3>
        <Info>
            <Title>Users</Title>
            <Data>{users.length?users[0].total:0}</Data>
        </Info>
        <Info>
            <Title>Products</Title>
            <Data>{items.length}</Data>
        </Info>
        <Info>
            <Title>Orders</Title>
            <Data>{orders.length?orders[0].total:0}</Data>
        </Info>
        <Info>
            <Title>Earnings</Title>
            <Data>${earnings.toLocaleString()}</Data>
        </Info>
    </Main>
  )
}


const Main=styled.div`
background:rgb(48,51,78);
color:rgba(234,234,255,0.87);
margin-top:1.5rem;
padding:1rem;
border-radius:5px;
font-size:14px;
`;

const Info=styled.div`
display:flex;
margin-top:1rem;
padding:0.3rem;
border-radius:3px;
background:rgba(38,198,249,0.12);
&:nth-child(even){
    background:rgba(102,108,255,0.12);
}

`
const Title=styled.div`

flex:1
`;
const Data=styled.div`
flex:1;
font-weight:700;
`