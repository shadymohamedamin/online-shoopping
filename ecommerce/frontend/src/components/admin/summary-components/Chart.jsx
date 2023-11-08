import styled from "styled-components";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart() {


  const[sales,setSales]=useState([]);
  const[loading,setLoading]=useState(0);
  //const[income,setIncome]=useState([]);
  //const[incomePerc,setIncomePerc]=useState(0);
  useEffect(()=>{
    try{
        function customSort(a,b){return b._id-a._id;}

        async function fetch_week(){
          try{
            const token=localStorage.getItem("token");
            //console.log(token);
            const instance=axios.create({
              baseURL:"http://localhost:5000/",
              headers:{Authorization:`Bearer ${token}`}
            });
            const result=await instance.get("/api/orders/week-sales");
            //console.log("widget: ",result.data);

            result.data.sort(customSort);
            const dat=result.data.map((item)=>{
                const days=["Sun","Mon","Tue","Wed","Thur","Fri","Sur"];
                return {
                    day:days[item._id-1],
                    amount:item.total/100
                }
            })
            setSales(dat);
            //console.log(dat)
            //if(result.data.length>=2)setIncomePerc(((result.data[0].total-result.data[1].total)/result.data[1].total)*100)
            //else alert("there is one order also!!!");
            //setIncome(result.data);console.log(income);
          }
          catch(err)
          {
            console.log(err);
          }
          
        }
        fetch_week();
      //const result=
    }
    catch(err)
    {
        console.log(err);
    }
  },[]);
    /*const data = [
        {
          day: 'Mon',
          amount: 4000,
          
        },
        {
          day: 'Tue',
          amount: 3000,
          
        },
        
      ];*/
  return (
    <StyledChart>
        <h3>Last 7 days earnings</h3>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={sales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          
        </LineChart>
      </ResponsiveContainer>
    </StyledChart>
  )
}




const StyledChart=styled.div`
width:100%;
height:300px;
margin-top:2rem;
padding:1rem;
border:2px solid rgba(48,51,78,0.2);
border-radius:5px;
h3:{
    margin-bottom:1rem;
}
`
const Loader=styled.div`
margin-top:2rem;
`