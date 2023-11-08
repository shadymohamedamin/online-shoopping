import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeFromCart } from "./cartSlice";
//import CreateProduct from "../components/admin/CreateProduct";
//const url=require('./api');
//const setHeaders=require('./api');

export const orders=createAsyncThunk("order/orders",async()=>{
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
      const result=await instance.get('/api/orders/get_orders')//.then((response) => {});
      
        // Do something with the response
        console.log("orders: ",result.data);
    return result?.data;
})
export const get_orders=createAsyncThunk("order/get_orders",async()=>{
  const token=localStorage.getItem("token");
  /*  axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    const result=await axios.get('http://localhost:5000/api/orders/get_orders');*/
    /*const instance = axios.create({
      baseURL: 'http://localhost:5000/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result=await instance.get('/api/orders/get_orders')//.then((response) => {});*/
    
      // Do something with the response
      const result=await axios.get('http://localhost:5000/api/orders/get_orders');
      console.log("orders: ",result.data);
  return result?.data;
})
export const update_orders=createAsyncThunk("order/update_orders",async(values)=>{
    const token=localStorage.getItem("token");
    //console.log(values);

    /*axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });*/
    const instance1 = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const result1=await instance1.get(`http://localhost:5000/api/orders/get_order/${values.id}`);
    const obj={
        ...result1.data,
        delivery_status:values.value
    }
    //console.log("obj: ",obj);
    //console.log(result.data);
     const instance2 = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result2=await instance2.post(`/api/orders/update_orders/${values.id}`,obj)//.then((response) => {});
      
        // Do something with the response
      console.log("success: ",result2.data);
    return result2?.data;
})

const orderSlice=createSlice({
    name:'order',
    initialState:{
        items:[],
        status:null,
        update_status:null
    },
    reducers:{},
    extraReducers:{
        [orders.pending]:(state,action)=>{
            state.status="pending";
        }
        ,[orders.rejected]:(state,action)=>{
            state.status="error";
            //console.log()
        },
        [orders.fulfilled]:(state,action)=>{
            //console.log(action.payload);
            state.status="success";
            if(action.payload)state.items=action.payload;
        },

        [update_orders.pending]:(state,action)=>{
            state.update_status="pending";
        }
        ,[update_orders.rejected]:(state,action)=>{
            state.update_status="error";
            //console.log()
        },
        [update_orders.fulfilled]:(state,action)=>{
            //console.log(action.payload);
            state.update_status="success";
            const newArr=state.items.map((item)=>(
                action.payload._id==item._id?action.payload:item
            ))
            state.items=newArr;
            //toast.success("order updated successfully...",{style:{backgroundColor:"white",color:"black"}})
            //if(action.payload)state.items=action.payload;
        },

      [get_orders.pending]:(state,action)=>{
          state.status="pending";
      }
      ,[get_orders.rejected]:(state,action)=>{
          state.status="error";
          //console.log()
      },
      [get_orders.fulfilled]:(state,action)=>{
          //console.log(action.payload);
          state.status="success";
          if(action.payload)state.items=action.payload;
      },
    }
});
export default orderSlice.reducer;