import React from 'react';
import jwtDecode from "jwt-decode";
import { GoogleLogin,GoogleOAuthProvider  } from '@react-oauth/google';
import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginUser } from "../../features/authSlice";
import '../../App.css'
import { useNavigate } from "react-router-dom";
//import { useDispatch } from "react-redux";
//const dispatch=useDispatch();
//const navigate=useNavigate();
const handleGoogleLoginSuccess = async(response) => {

    console.log(response.credential);
    localStorage.setItem("googleToken",response.credential);
    const obj=jwtDecode(response.credential);
        /*const instance = axios.create({
            baseURL: 'http://localhost:5000',
            headers: {
              Authorization: `Bearer ${response.credential}`,
            },
          });*/
        //const result=await  instance.post('/api/users/create_product',values);
        console.log("shady",obj);
    const result=await axios.post('http://localhost:5000/api/login/auth-google',{name:obj.name,email:obj.email});
    console.log(result);
    if(result.status==204)
    {
        //console.log("shady not found");
        window.location.href="http://localhost:3000/enter-your-password";
    }
    else
    {
        const token=result.data;
        const dec=jwtDecode(token);
        localStorage.setItem("token",token);
        //alert("before")
        window.location.reload();
        //alert("after")
        //setTimeout(()=>{
        //    window.location.reload(false);
        //},2147483620);
        //dispatch(loadUser());
        //load
    }
    //console.log("decode",)
    
    //setImage(jwtDecode(response.credential).picture);

    //window.location.href='http://localhost:3000/';
};
const Login_With_Google = ({text}) => {
  const clientId = "331687711665-ugudsjo42naubqevb09alrjiv491i4bk.apps.googleusercontent.com";
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const auth=useSelector(state=>state.auth);
  const [k,setK]=useState("");
  useEffect(()=>{
    if(localStorage.getItem("token"))
    {
        dispatch(loadUser());
        navigate("/");
    }
  },[]);
  /*useEffect(()=>{
    if(localStorage.getItem("token"))
    {
        alert("hello");
        console.log("load",localStorage.getItem("token"))
        navigate("/");
        
        
        //window.location.href="http://localhost:3000/";
    }
    
        //navigate("/");
  },[localStorage.getItem("token"),dispatch]);*/
  /*useEffect(()=>{
    if(auth._id)
    {
        window.location.href="http://localhost:3000/";
        //navigate("/");
    }
  },[auth._id]);*/
  return (
    <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
      clientId={clientId}
      buttonText={text}
      onSuccess={handleGoogleLoginSuccess}
      width={350}
    />
    </GoogleOAuthProvider>
  );
};
export default Login_With_Google