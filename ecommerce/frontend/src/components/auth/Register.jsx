import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import '../../App.css'
import { useNavigate } from "react-router-dom";
import Login_With_Google from "./LongBut";

const Register = () => {
    const dispatch=useDispatch();
    const auth=useSelector(state=>state.auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(auth._id)
        {
            navigate("/");
        }
    },[auth._id])
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    });
    const but=useRef();
    const [butName,setButName]=useState("Register");
    /*const problem = useMemo(() => {
        if (auth.registerStatus === "error") {
            return <p style={{ color: "red" }}>{auth.registerError}</p>;
        } else {
            return (
                <>
                    {setButName("Submitting...")}
                    {but.current && (but.current.disabled = true)}
                </>
            );
        }
    }, [auth.registerStatus]);*/


    const problem=useMemo(()=>{
        if(auth.registerStatus=="rejected")
        {
            return (
                <>
                    <p style={{"color":"red"}}>{auth.registerError}</p>
                    <>
                        {setButName("Register")}
                        {but.current?but.current.disabled=false:null}
                    </>
                </>
            )
        }
        else if(auth.registerStatus=="pending")
        {
            return (
                <>
                    {setButName("Submitting")}
                    {but.current?but.current.disabled=true:null}
                </>
            )
        }
        else return (
                <>
                    {user.name&&<p style={{"color":"green"}}>congrats...you registered successfuly</p>}
                    <>
                        {setButName("Register")}
                        {but.current?but.current.disabled=false:null}
                    </>
                </>
            
            )
    },[auth.registerStatus]);



    //{auth.registerStatus=="rejected"?<p style={{"color":"red"}}>{auth.registerError}</p>:auth.registerStatus=="pending"?null:<><p style={{"color":"green"}}>congrats...you registered successfuly</p></>}



        //((setButName("Submitting..."),but.current?but.current.disabled=true:null))
    /*const handle=()=>{
        but.current.disabled=true;
    }*/
    //but.current.value="s";
    console.log(auth);
    /*useEffect(()=>{
        console.log(user);
    },[user])*/
    const [pass1,setPass1]=useState("");
    const [pass2,setPass2]=useState("");
    const [prob,setProb]=useState("");
    const submit=(e)=>{
        e.preventDefault();
        if(pass1!=pass2){setProb("password is not equal");return;}
        if(pass1.length<6){setProb("password is too short");return;}
        dispatch(registerUser(user));
    }
    return ( <>
        <form onSubmit={submit} className="formy">
            <h2>Register</h2>
            <input className="formyt" type="text" placeholder="enter your name" onChange={ (e)=>setUser({...user,name:e.target.value}) }/>
            <input className="formyt" type="email" placeholder="enter your email" onChange={ (e)=>setUser({...user,email:e.target.value}) }/>
            <input className="formyt" type="password" placeholder="enter your password" onChange={ (e)=>{setUser({...user,password:e.target.value}); setPass1(e.target.value)}}/>
            <input className="formyt" type="password" placeholder="confinrm your password" onChange={ (e)=>{setPass2(e.target.value)}}/>
            <button className="formyt" type="submit" disabled={false} ref={but}>{butName}</button>
            <Login_With_Google text="Sign Up With Google"></Login_With_Google>
            <br/>
            <br/>
            {problem}
            <br/>
            {prob&&<p style={{"color":"red"}}>{prob}</p>}

        </form>
    </> );
}
 
export default Register;