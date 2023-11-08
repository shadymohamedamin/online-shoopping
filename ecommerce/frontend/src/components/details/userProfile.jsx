import React from 'react'
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
//import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { update_user } from '../../features/userSlice';
//import User from '../../../../backend/models/user';
export default function UserProfile() {

const params=useParams();
    const [user,setUser]=useState({
      _id:"",
      name:"",
      email:"",
      isAdmin:false,
      password:"",
    });
    const [pass,setPass]=useState("");
    const dispatch=useDispatch();
    useEffect(()=>{
      const token=localStorage.getItem("token");
                //console.log(token);
      const instance=axios.create({
        baseURL:"http://localhost:5000/",
        headers:{Authorization:`Bearer ${token}`}
      });
      instance.get(`/api/products/get_user/${params.id}`)
      .then(res=>{
        //setPass(res.password);
        //console.log(res.data);
        setUser({...res.data,new_password:""});
        
        //console.log(user);
      })
      .catch((err)=>{
        console.log(err);
      })
    },[]);
    
    const handle_update=()=>{
      //e.preventDefault();
      
      //alert(user.name)
      if(pass.length>0&&pass.length<6){alert("password should be at least 6 characters...");return;}
      if(pass=="")
      {
        const obj={
          _id:user._id,
          name:user.name,
          email:user.email,
          password:user.password,
          new_password:pass,
          createdAt:user.createdAt,
          updatedAt:user.updatedAt,
          isAdmin:user.isAdmin?user.isAdmin:false
        }
        //setUser({...user,new_password:user.password});
        console.log("old user",obj);
        setUser(obj);
        setPass("");
        dispatch(update_user(obj));
      }
      else 
      {
        const obj={
          _id:user._id,
          name:user.name,
          email:user.email,
          password:user.password,
          new_password:pass,
          createdAt:user.createdAt,
          updatedAt:user.updatedAt,
          isAdmin:user.isAdmin?user.isAdmin:false
        }
        //setUser({...user,new_password:user.password});
        console.log("old user",obj);
        setUser(obj);
        setPass("");
        dispatch(update_user(obj));
        //setUser({...user,new_password:pass});
        
        //dispatch(update_user(user));
      }

    }
    const [prod,setProd]=useState();
    return (
        
        <StyledOrder>
          <OrderContainer>
            
              <Tan>
              <h3>User Profile</h3>
              <h3>{user.isAdmin?<Admin>Admin</Admin>:<Customer>Customer</Customer>}</h3>
              </Tan>
              
              <p htmlFor='name'>Name:</p>
              <input className='inputs' required type='text' id="name" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}></input>
              <p htmlFor='email'>Email:</p>
              <input className='inputs' required type='text' id="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}></input>
              <p htmlFor='password'>Password:</p>
              <input className='inputs' type='text' id="password" value={pass} onChange={(e)=>setPass(e.target.value)}></input>
              <br/>
              <But  onClick={handle_update} >Update</But>
            
            
          </OrderContainer>
        </StyledOrder>
    )
}



const But=styled.button`
  width:200px;
  
  height: 40px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 400;
  border:none;
  outline:none;
  cursor: pointer;
  background: #4b70e2;
  color: white;
  letter-spacing: 1.3px;
  
`


const ProfileContainer=styled.div`
max-width:500px;
width:100%;
height:auto;
display:flex;
box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px;
border-radius:5px;
padding:2rem;
form{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  h3{
    margin-bottom:0.5rem;

  }
  label{
    margin-bottom:0.5rem;
    color:gray;

  }
  input{
    margin-bottom:1rem;
    outline:none;
    border:none;
    border-bottom:1px solid gray;
    width:300px;
    font-size:20px;
  }
}

`;
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

`;

const Admin=styled.span`
width:60px;
padding:3px 5px;
color:rgb(253,181,40);
background-color:rgb(253,181,40,0.12);
border-radius:3px;
font-size:14px;
margin-bottom:1rem;
`;
const Dispatched=styled.div`

padding:3px 5px;
color:rgb(255,77,73);
background-color:rgba(255,77,73,0.12);
border-radius:3px;
font-size:14px;
`;
/*#4b70e2;*/
const Customer=styled.div`
width:80px;
padding:3px 5px;
color:rgb(38, 198, 249);
background-color:rgba(38, 198, 249,0.12);
border-radius:3px;
font-size:14px;
margin-bottom:1rem;
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
