import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

export default function ResetPassword() {
    const dispatch=useDispatch();
    const auth=useSelector(state=>state.auth);
    const navigate=useNavigate();
    const [problem,setProblem]=useState("");
    const [sent,setSent]=useState(null);
    const [count,setCount]=useState(0);
    const [email,setEmail]=useState("");
    useEffect(()=>{
        if(auth._id)
        {
            navigate("/");
        }
    },[auth._id]);
    const submit=async(e)=>{
      
      e.preventDefault();
      setProblem(null);
      setSent(null);
      //alert(email);
      const result=await axios.post(`http://localhost:5000/api/login/verify-email/${email}`);
      if(result.status==204){
        setProblem("email not exist please Sign up");
        return;
      }
      console.log("resetPassword",result);
      setSent("email sent successfully");
      setCount(60);
    }

    //alert(email);
    useEffect(()=>{
      if(count>0)
      {
        setTimeout(() => {
          setCount(count-1);
        }, 1000);
      }
      else if(count==0)
      {
        setProblem(null);
        setSent(null);
      }
    },[count]);
  return (
    <>
      <Cont1><h2>Reset your Password</h2></Cont1>
      
      <Cont>
        
        <input placeholder='enter your email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
        {!count&&<button onClick={submit}>Send</button>}
        {count>0&&<Pd>{count}</Pd>}
        {sent&&<p style={{"color":"green"}}>{sent}</p>}
        {problem&&<p style={{"color":"red"}}>{problem}</p>}
      </Cont>
      
    </>
  )
}
const Pd=styled.p`
padding:2rem;
margin:1rem;
`;
const Cont=styled.div`
display:flex;
  flex-direction: column;
  min-height: 60vh;
align-items:center;
justify-content:center;
input{
  width:400px;
  font-size:25px;
  border-radius:10px;
}
button{
  padding:0.7rem;
  margin:1rem;
  cursor:pointer;
  background-color:brown;
  color:white;
  border:none;
  outline:none;
  border-radius:10px;
}
`
const Cont1=styled.div`
display:flex;
  flex-direction: column;
  padding:2rem;
  
align-items:center;
justify-content:center;
`
