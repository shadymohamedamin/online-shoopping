import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginUser } from "../../features/authSlice";
import '../../App.css'
import { Link, useNavigate } from "react-router-dom";
import Login_With_Google from "./LongBut";
import styled from "styled-components";
//import { google } from './google-auth';
//331687711665-ugudsjo42naubqevb09alrjiv491i4bk.apps.googleusercontent.com
                //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
const Login = () => {

    const dispatch=useDispatch();
    const auth=useSelector(state=>state.auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(auth._id)
        {
            navigate("/");
        }
    },[auth._id]);

    const [user,setUser]=useState({
        
        email:"",
        password:"",
    });
    const but=useRef();
    const [butName,setButName]=useState("Login");
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
        if(auth.loginStatus=="rejected")
        {
            return (
                <>
                    <p style={{"color":"red"}}>{auth.loginError}</p>
                    <>
                        {setButName("Login")}
                        {but.current?but.current.disabled=false:null}
                    </>
                </>
            )
        }
        else if(auth.loginStatus=="pending")
        {
            return (
                <>
                    {setButName("Waiting")}
                    {but.current?but.current.disabled=true:null}
                </>
            )
        }
        else return (
                <>
                    {user.name&&<p style={{"color":"green"}}>congrats...your login is successfuly</p>}
                    <>
                        {}
                        {setButName("Login")}
                        {but.current?but.current.disabled=false:null}
                    </>
                </>
            
            )
    },[auth.loginStatus]);



    //{auth.registerStatus=="rejected"?<p style={{"color":"red"}}>{auth.registerError}</p>:auth.registerStatus=="pending"?null:<><p style={{"color":"green"}}>congrats...you registered successfuly</p></>}



        //((setButName("Submitting..."),but.current?but.current.disabled=true:null))
    /*const handle=()=>{
        but.current.disabled=true;
    }*/
    //but.current.value="s";
//    console.log(auth);
    /*useEffect(()=>{
        console.log(user);
    },[user])*/
    const submit=(e)=>{
        e.preventDefault();
        //alert(user.email);
        dispatch(loginUser(user));
    }
    /*function handleCallbackResponse(response)
    {
        console.log(response.credential);
    }
    useEffect(()=>{
        google.accounts.id.initialize({
            client_id:"331687711665-ugudsjo42naubqevb09alrjiv491i4bk.apps.googleusercontent.com",
            callback:handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme:outline,size:"large"}
        );
    },[]);*/
    return ( <>
        <form onSubmit={submit} className="formy">
            <div id="signInDiv"></div>
            <h2>Login</h2>
            <input  className="formyt" type="email"    placeholder="enter your email" onChange={ (e)=>setUser({...user,email:e.target.value}) }/>
            <input  className="formyt" type="password" placeholder="enter your password" onChange={ (e)=>setUser({...user,password:e.target.value}) }/>
            <button className="formyt" type="submit"   disabled={false} ref={but}>{butName}</button>
            <Login_With_Google className="formyt" text="Sign In With Google"/>
            <Cont>
              <Link to={'/register'}><Sp1 >Sign up</Sp1></Link>
              <Link to={'/send-email'}><Sp2 >forget password?</Sp2></Link>
            </Cont>
            <br/>
            <br/>
            {problem}

        </form>
    </> );
}
 
export default Login;

const Cont=styled.div`
display:felx;
color:red;
justify-content:space-between;
`
const Sp1=styled.span`
padding-top:1rem;
float:left;
`;
const Sp2=styled.span`
padding-top:1rem;
float:right;
`;


/*import swal from 'sweetalert';
import jwtDecode from "jwt-decode";
const Logingoogle = () => {

    const buttonContainerRef = useRef(null);
    const [image,setImage]=useState();
    useEffect(() => {
        const handleCredentialResponse = (response) => {
            console.log(response.credential);
            console.log("decode",jwtDecode(response.credential))
            
            setImage(jwtDecode(response.credential).picture);

            //window.location.href='http://localhost:3000/';
        };

        const initGoogleSignIn = () => {
            if (window.google?.accounts?.id) {
                window.google.accounts.id.initialize({
                    client_id: "331687711665-ugudsjo42naubqevb09alrjiv491i4bk.apps.googleusercontent.com",
                    callback: handleCredentialResponse
                });

                if (buttonContainerRef.current) {
                    window.google.accounts.id.renderButton(
                        buttonContainerRef.current,
                        { theme: "outline", size: "large" }
                    );
                }
            } else {
                setTimeout(initGoogleSignIn, 500);
            }
        };

        initGoogleSignIn();
    }, []);

    
    return (
        <div>
            <div ref={buttonContainerRef}></div>
            <img src={image} alt="shady"></img>
        </div>
    );
};
export default Logingoogle;*/





/*import React from 'react';
//import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    // Redirect the user to the Google OAuth login page
    window.location.href='http://localhost:5000/auth/google/callback';//navigate('http://localhost:5000/auth/google/callback');
  };
//const navigate=useNavigate
  return (
    <button onClick={handleClick}>Continue with Google</button>
  );
};

export default GoogleLoginButton;*/





/*import React from 'react';

const Login = () => {
  const [code, setCode] = useState(null);

  const handleClick = async () => {
    // Redirect the user to the Google OAuth 2.0 authorization endpoint
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=331687711665-ugudsjo42naubqevb09alrjiv491i4bk.apps.googleusercontent.com&response_type=code&scope=email&redirect_uri=http://localhost:5000/auth/google/callback`;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authorizationCode = searchParams.get('code');

    if (authorizationCode) {
      setCode(authorizationCode);
    }
  }, [window.location.search]);

  return (
    <button onClick={handleClick}>Continue with Google</button>
  );
};
export default Login;

/*import React from 'react';
import googleAuth from './LongBut';

const GoogleLoginButton = () => {
  const [token, setToken] = useState(null);

  const handleClick = async () => {
    // Login with Google
    await googleAuth.login();

    // Get the JWT token from the backend
    const token = await googleAuth.getJwtToken();

    // Set the JWT token in the state
    setToken(token);
  };

  return (
    <button onClick={handleClick}>Continue with Google</button>
  );
};

export default GoogleLoginButton;*/








/*import React from 'react'

export default function Login() {
  return (
    <div>Login</div>
  )
}*/






//import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'


//import './App.css';
/*import GoogleLogin from 'react-google-login';
//import { useState } from 'react';

function Login() {
  //const [loginData, setLoginData] = useState(
 //   localStorage.getItem('loginData')
 //     ? JSON.parse(localStorage.getItem('loginData'))
 //     : null
 // );

  const handleFailure = (result) => {
    console.log("shady",result);
  };

  const handleLogin = async (googleData) => {
    console.log("login")
    /*const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));*/
/*  };
  const handleLogout = () => {
    //localStorage.removeItem('loginData');
    //setLoginData(null);
  };
 const idd='331687711665-ugudsjo42naubqevb09alrjiv491i4bk.apps.googleusercontent.com';
  return (
    <div className="App">
        <GoogleLogin
            clientId={idd}
            buttonText="Log in with Google"
            
        ></GoogleLogin>
    </div>
  );
}

export default Login;*/