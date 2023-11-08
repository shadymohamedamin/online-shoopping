import React, { useEffect, useState } from 'react';
import {FaUsers,FaChartBar,FaClipboard} from "react-icons/fa";
import Widget from './summary-components/widget';
import styled from 'styled-components';
import axios from 'axios';
import Chart from './summary-components/Chart';
import Transaction from './summary-components/Transaction';
import AllTimeData from './summary-components/AllTimeData';
export default function Summary() {

  const[users,setUsers]=useState([]);
  const[usersPerc,setUsersPerc]=useState(0);
  const[orders,setOrders]=useState([]);
  const[ordersPerc,setOrdersPerc]=useState(0);
  const[income,setIncome]=useState([]);
  const[incomePerc,setIncomePerc]=useState(0);
  useEffect(()=>{
    try{
        function customSort(a,b){return b._id-a._id;}
        
        async function fetch_users(){
          const token=localStorage.getItem("token");
          console.log(token);
          const instance=axios.create({
            baseURL:"http://localhost:5000/",
            headers:{Authorization:`Bearer ${token}`}
          })
          const result=await instance.get("/api/users/stats");
          result.data.sort(customSort);
          //alert(result.data.length);
          //console.log((result.data[0].total-result.data[1].total)/result.data[1].total*100)
          if(result.data.length>=2)
          {
            
            setUsersPerc(((result.data[0].total-result.data[1].total)/result.data[1].total)*100)
          
          }
            //else alert("there is one user also!!!");
          setUsers(result.data);console.log(users);
        }
        fetch_users();

        async function fetch_orders(){
          const token=localStorage.getItem("token");
          console.log(token);
          const instance=axios.create({
            baseURL:"http://localhost:5000/",
            headers:{Authorization:`Bearer ${token}`}
          })
          const result=await instance.get("/api/orders/stats");
          result.data.sort(customSort);
          //console.log((result.data[0].total-result.data[1].total)/result.data[1].total*100)
          if(result.data.length>=2)setOrdersPerc(((result.data[0].total-result.data[1].total)/result.data[1].total)*100)
          //else alert("there is one order also!!!");
          setOrders(result.data);console.log(orders);
        }
        fetch_orders();

        async function fetch_income(){
          try{
            const token=localStorage.getItem("token");
            //console.log(token);
            const instance=axios.create({
              baseURL:"http://localhost:5000/",
              headers:{Authorization:`Bearer ${token}`}
            });
            const result=await instance.get("/api/orders/income/stats");
            console.log(result);
            result.data.sort(customSort);
          
            if(result.data.length>=2)setIncomePerc(((result.data[0].total-result.data[1].total)/result.data[1].total)*100)
            //else alert("there is one order also!!!");
            setIncome(result.data);console.log(income);
          }
          catch(err)
          {
            console.log(err);
          }
          
        }
        fetch_income();
      //const result=
    }
    catch(err)
    {
        console.log(err);
    }
  },[]);

  const data=[
    {
    icon:<FaUsers/>,
    digits:users.length?users[0].total:0,
    isMoney:false,
    title:"Users",
    color:"rgb(192,108,255)",
    bgColor:"rgba(192,108,255,0.12)",
    percentage:usersPerc
    },
    {
      icon:<FaClipboard/>,
      digits:orders.length?orders[0].total:0,
      isMoney:false,
      title:"Orders",
      color:"rgb(38,198,249)",
      bgColor:"rgba(38,198,249,0.12)",
      percentage:ordersPerc
    },
    {
      icon:<FaChartBar/>,
      digits:income.length?income[0].total/100:0,
      isMoney:true,
      title:"Earnings",
      color:"rgb(253,181,40)",
      bgColor:"rgba(253,181,40,0.12)",
      percentage:incomePerc
    },

]
  return (

    <div>
      <div className='styledSummary'>
        <div className='mainStatus'>
          <div className='overview'>
            <div className='title_title'>
              <h2>Overview</h2>
              <p>How your shop is performing compared to previous month.</p>

            </div>
            <div className='widget_widget'>
              {data?.map((item,index)=>(
                <Widget key={index} data={item}/>
              ))}
            </div>
            
          </div>
          <Chart/>
        </div>
        <div className='side'>
          <Transaction></Transaction>
          <AllTimeData></AllTimeData>
        </div>
      </div>
    </div>
  )
}


//const styledComp=styled.div`
//  color:white;
//`



/*styled summary
width:100%;
display:flex;
*/
/*
main status
flex: 2;
width:100%;
*/

/*
title:
p{
  font-size:14px;
  color:rgba(234,234,255,0,68)
}
 */


/**
  overview
  {
    background:rgb(48,51,78);
    color:rgb(234,234,255,0.87);
    width:100%;
    padding:1.5rem;
    height:150px;
    border-radios:
    display:flex;
    flex-direction:column;
    justify-content:space-between;

  }
 */
  

  /*
  widget{
display:flex;
  width:100%;
  justify-content:space-between;
  }
  */

  /**
   flex:1;
    display:flex;
    flex-direction:column;
    margin-left:2rem;
    width:100%;
   */