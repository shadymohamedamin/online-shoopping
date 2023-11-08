import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeFromCart } from "./cartSlice";
//import CreateProduct from "../components/admin/CreateProduct";
const url=require('./api');
const setHeaders=require('./api');


//import { url } from "../../../backend/utiles/cloudinary";
var temp;
export const insert=createAsyncThunk("product/insert",async()=>{
    //const result=await axios.get("http://localhost:5000/get");
    const token=localStorage.getItem("token");
    /*const instance = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });*/
      
      // Make a request to the API
      //const result=await instance.get('/get')//.then((response) => {
        // Do something with the response
      //});
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      
      // Make a request to the API
      const result=await axios.get('http://localhost:5000/get');


      /*const instance = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });*/
      //const result=await instance.get('/get')//.then((response) => {});
      
        // Do something with the response

    temp=result?.data;
    console.log("temp: ",temp);
    const line_items = result.data.map((item) => {
        return {
          id:item._id,
          name:item.name,
          price:item.price,
          brand:item.brand,
          desc:item.desc,
          sr:item.sr.secure_url,
          product_quantity:item?.product_quantity,
          sold:item?.sold
        };
      });
    console.log("line_items: ",line_items);  
    return line_items;//result?.data;
})
export const productsCreate=createAsyncThunk("product/productsCreate",async(values)=>{
    try{
        
        const token=localStorage.getItem("token");
        console.log(token);
        //const result=await axios.post(`http://localhost:5000/api/products`,values);//,setHeaders());
        /*axios.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          });
          
          // Make a request to the API
        const result=await axios.post('http://localhost:5000/api/products',values);*/

        const instance = axios.create({
            baseURL: 'http://localhost:5000/',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          // Make a request to the API
        const result=await  instance.post('/api/users/create_product',values);


    //temp=result?.data;
        console.log("result: ",result);
        const obj={
            id:result.data._id,
            name:result.data.name,
            brand:result.data.brand,
            price:result.data.price,
            sr:result.data.sr.secure_url,
            desc:result.data.desc
        }
        //console.log("result: ",obj);
        return obj;//result?.data;
    }
    catch(err)
    {
        console.log("error: ",err);
        toast.error(err.response?.data.error);
        //toast.error(err.response.data);
    }
    
})
export const productsUpdate=createAsyncThunk("product/productsUpdate",async(values)=>{
  try{
      
      const token=localStorage.getItem("token");
      console.log(token);
      //const result=await axios.post(`http://localhost:5000/api/products`,values);//,setHeaders());
      /*axios.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        });
        
        // Make a request to the API
      const result=await axios.post('http://localhost:5000/api/products',values);*/

      const instance = axios.create({
          baseURL: 'http://localhost:5000/',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Make a request to the API
      const result=await  instance.post(`/api/users/update_product/${values.id}`,values);


  //temp=result?.data;
      console.log("result: ",result);
      const obj={
          id:result.data._id,
          name:result.data.name,
          brand:result.data.brand,
          price:result.data.price,
          sr:result.data.sr.secure_url,
          desc:result.data.desc
      }
      //console.log("result: ",obj);
      return obj;//result?.data;
  }
  catch(err)
  {
      console.log("error: ",err);
      toast.error(err.response?.data.error);
      //toast.error(err.response.data);
  }
  
})


export const productsDelete=createAsyncThunk("product/productsDelete",async(id)=>{
  try{
      //const newArr=state.items.filter((element)=>action.payload.id!==element.id);
      const token=localStorage.getItem("token");
      console.log(token);
      const instance = axios.create({
          baseURL: 'http://localhost:5000/',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      const result=await  instance.post(`/api/users/delete_product/${id}`);

      console.log("result: ",result);

      /*if(result.status==200)
      {
        const dispatch=useDispatch();
        dispatch(removeFromCart(result.data._id));
        
      }*/
      return result.data;
  }
  catch(err)
  {
      console.log("error: ",err);
      toast.error(err.response?.data.error);
  }
})


const productSlice=createSlice({
    name:'product',
    initialState:{
        items:[],
        status:null,
        createStatus:null,
        deleteStatus:null,
        updateStatus:null,
        value:""
    },
    reducers:{},
    extraReducers:{
        [insert.pending]:(state,action)=>{
            state.status="pending";
        }
        ,[insert.rejected]:(state,action)=>{
            state.status="error";
            //console.log()
        },
        [insert.fulfilled]:(state,action)=>{
            //console.log(action.payload);
            state.status="success";
            if(action.payload)state.items=action.payload;
        },

        [productsCreate.pending]:(state,action)=>{
            state.createStatus="pending";
        }
        ,[productsCreate.rejected]:(state,action)=>{
            state.createStatus="error";
            if(action.payload)toast.error(action.payload);
            //toast.error(error.response?.data);
            //console.log()
        },
        [productsCreate.fulfilled]:(state,action)=>{
            //console.log(action.payload);
            state.createStatus="success";
            //
            //alert(action.payload);
            if(action.payload)toast.success(`${action.payload.name} created successfuly`, {/*position:"bottom-left",//bottom-left",style: {backgroundColor: 'white',color: 'black',},*/});
            if(action.payload)state.items.push(action.payload);
        },


      [productsDelete.pending]:(state,action)=>{
          state.deleteStatus="pending";
      }
      ,[productsDelete.rejected]:(state,action)=>{
          state.deleteStatus="error";
          if(action.payload)toast.error(action.payload);
          //toast.error(error.response?.data);
          //console.log()
      },
      [productsDelete.fulfilled]:(state,action)=>{
          //console.log(action.payload);
          state.deleteStatus="success";
          console.log(action.payload);
          //alert(action.payload._id);
          const newArr=state.items.filter((element)=>action.payload._id!==element.id);
          //
          //dispatch(removeFromCart(action.payload._id));
          
          state.items=newArr;
          //alert(action.payload);
          if(action.payload)toast.error(`Product deleted successfuly`, {/*position:"bottom-left",//bottom-left",style: {backgroundColor: 'white',color: 'black',},*/});
          //if(action.payload)state.items.push(action.payload);
      },



    [productsUpdate.pending]:(state,action)=>{
        state.updateStatus="pending";
    }
    ,[productsUpdate.rejected]:(state,action)=>{
        state.updateStatus="error";
        if(action.payload)toast.error(action.payload);
        //toast.error(error.response?.data);
        //console.log()
    },
    [productsUpdate.fulfilled]:(state,action)=>{
        //console.log(action.payload);
        state.updateStatus="success";
        //state.status="success";
        const newArr=state.items.map((item)=>(
                action.payload._id==item.id?action.payload:item
            ))
            state.items=newArr;
        //console.log(action.payload);
        //alert(action.payload._id);
        //const newArr=state.items.filter((element)=>action.payload._id!==element.id);
        //
        //dispatch(removeFromCart(action.payload._id));
        
        //state.items=newArr;
        //alert(action.payload);
        if(action.payload)toast.success(`Product updated successfuly`,{style:{backgroundColor:'blue',color:'white'}})// {/*position:"bottom-left",*///bottom-left",style: {backgroundColor: 'white',color: 'black',},*/});
        //if(action.payload)state.items.push(action.payload);
    }


    }
});


export default productSlice.reducer;