import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { loadUser } from '../../features/authSlice';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function ChoosePassword() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const params=useParams();
    useEffect(()=>{
        if(!localStorage.getItem("googleToken")||localStorage.getItem("token"))
        {
            navigate("/");
        }
    },[]);
    const [pass1,setPass1]=useState("");
    const [pass2,setPass2]=useState("");
    const [problem,setProblem]=useState("");
    const submit=async(e)=>{
        e.preventDefault();
        if(pass1!=pass2){setProblem("password is not equal");return;}
        if(pass1.length<6){setProblem("password is too short");return;}
        const obj=jwtDecode(localStorage.getItem("googleToken"));
        //console.log("shady",obj);
        const result=await axios.post('http://localhost:5000/api/login/auth-google',{name:obj.name,email:obj.email,password:pass1});
        console.log(result);
        localStorage.setItem("token",result.data);
        dispatch(loadUser());
        window.location.href="http://localhost:3000/";//navigate("/");
        //const result=
    }
  return (
    <div>
        <form onSubmit={submit} className="formy">
            <div id="signInDiv"></div>
            <h2>Please enter password to login</h2>
            <input  className="formyt" type="password" placeholder="enter your password" onChange={ (e)=>setPass1(e.target.value) }/>
            <input  className="formyt" type="password" placeholder="confirm your password" onChange={ (e)=>setPass2(e.target.value) }/>
            <button className="formyt" type="submit">Submit</button>

            {problem&&<p style={{"color":"red"}}>*{problem}</p>}

        </form>
    </div>
  )
}
