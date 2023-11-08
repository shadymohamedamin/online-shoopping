import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
//import { removeFromCart } from "./cartSlice";
//import CreateProduct from "../components/admin/CreateProduct";
//const url=require('./api');
//const setHeaders=require('./api');

export const users=createAsyncThunk("order/orders",async()=>{
    const token=localStorage.getItem("token");
    /*  axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      const result=await axios.get('http://localhost:5000/api/orders/get_orders');*/
      const instance = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result=await instance.get('/api/users/get_users')//.then((response) => {});
      
        // Do something with the response
        console.log("orders: ",result.data);
    return result?.data;
})
export const make_admin=createAsyncThunk("order/update_orders",async(values)=>{
    const token=localStorage.getItem("token");
    //console.log(values);

    
    const instance1 = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const result1=await instance1.get(`/api/products/get_user/${values.id}`);
    const obj={
        ...result1.data,
        isAdmin:values.value=="Customer"?false:true
    }
    //console.log("obj: ",obj);
    //console.log(result.data);
    const instance2 = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      //const result1=await instance.get(`http://localhost:5000/api/orders/get_order/${values.id}`);
      const result2=await instance2.post(`/api/users/make_admin/${values.id}`,obj)//.then((response) => {});
      
        // Do something with the response
      console.log("success: ",result2.data);
    return result2?.data;
})
export const delete_user=createAsyncThunk("order/delete_user",async(values)=>{
    const token=localStorage.getItem("token");
    //console.log(values);

    const instance = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //const result1=await axios.post(`http://localhost:5000/api/users/delete_order/${values}`);
    
    //console.log("obj: ",obj);
    //console.log(result.data);
     
    const result1=await instance.post(`/api/users/delete_user/${values}`)//.then((response) => {});
      
        // Do something with the response
      console.log("success: ",result1.data);
    return result1?.data;
})
export const update_user=createAsyncThunk("user/update_user",async(values)=>{
    const token=localStorage.getItem("token");
    console.log("values",values);
    //alert(values.name)
    const instance = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //const result1=await axios.post(`http://localhost:5000/api/users/delete_order/${values}`);
    
    //console.log("obj: ",obj);
    //console.log(result.data);
     
    const result1=await instance.post(`/api/products/update_user/${values._id}`,values)//.then((response) => {});
      
        // Do something with the response
      console.log("success: ",result1.data);
    return result1?.data;
})
const userSlice=createSlice({
    name:'user',
    initialState:{
        items:[],
        status:null,
    },
    reducers:{},
    extraReducers:{
        [users.pending]:(state,action)=>{
            state.status="pending";
        }
        ,[users.rejected]:(state,action)=>{
            state.status="error";
            //console.log()
        },
        [users.fulfilled]:(state,action)=>{
            //console.log(action.payload);
            state.status="success";
            if(action.payload)state.items=action.payload;
        },
        [delete_user.pending]:(state,action)=>{
            state.status="pending";
        }
        ,[delete_user.rejected]:(state,action)=>{
            state.status="error";
            //console.log()
        },
        [delete_user.fulfilled]:(state,action)=>{
            console.log(action.payload);
            state.status="success";

            toast.error("deleted successfully");
            //if(action.payload)state.items=action.payload;
        },


        [make_admin.pending]:(state,action)=>{
            state.status="pending";
        }
        ,[make_admin.rejected]:(state,action)=>{
            state.status="error";
            //console.log()
        },
        [make_admin.fulfilled]:(state,action)=>{
            //console.log(action.payload);
            state.status="success";
            //const newArr=state.items.map((item)=>(
            //    action.payload._id==item._id?action.payload:item
            //))
            //state.items=newArr;
            toast.success("user updated successfully...",{style:{backgroundColor:"white",color:"black"}})
            //if(action.payload)state.items=action.payload;
        },
        [update_user.pending]:(state,action)=>{
            state.status="pending";
        }
        ,[update_user.rejected]:(state,action)=>{
            state.status="error";
            //console.log()
        },
        [update_user.fulfilled]:(state,action)=>{
            //console.log(action.payload);
            state.status="success";
            //const newArr=state.items.map((item)=>(
            //    action.payload._id==item._id?action.payload:item
            //))
            //state.items=newArr;
            toast.info("user updated successfully...",{style:{backgroundColor:"white",color:"black"}})
            //if(action.payload)state.items=action.payload;
        },


    }
});
export default userSlice.reducer;