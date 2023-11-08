import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
//const jwtDecode=require('jwt-decode');//import jwtDecode from 'jwt-decode';

export const registerUser=createAsyncThunk("auth/registerUser",async(user,{rejectWithValue})=>{
    try{
        const token=await axios.post(`${url}/register`,{
            name:user.name,
            email:user.email,
            password:user.password
        });
        localStorage.setItem("token",token.data);
        return token.data;
    }
    catch(err){
        return rejectWithValue(err.response.data);
    }
})
export const loginUser=createAsyncThunk("auth/loginUser",async(user,{rejectWithValue})=>{
    try{
        const token=await axios.post(`${url}/login`,{
            email:user.email,
            password:user.password
        });
        localStorage.setItem("token",token.data);
        return token.data;
    }
    catch(err){
        return rejectWithValue(err.response.data);
    }
})
export const update_user_products=createAsyncThunk("auth/update_user_products",async(values,{rejectWithValue})=>{
    try{

        console.log("before updateing.. ",values.value);
        const token=localStorage.getItem("token");
        const instance = axios.create({
            baseURL: 'http://localhost:5000/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        //alert(values.value.length)
        const result=await  instance.post(`/api/products/update_user_products/${values.id}`,values.value);//id,arr
        console.log("after updateing.. ",result);
        return result.data;
    }
    catch(err){
        return rejectWithValue(err.response.data);
    }
})
export const get_user_products=createAsyncThunk("auth/get_user_products",async(values,{rejectWithValue})=>{
    try{
        
        //console.log("before updateing.. ",values.value);
        const token=localStorage.getItem("token");
        const instance = axios.create({
            baseURL: 'http://localhost:5000/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        //alert(values.value.length)
        const result=await  instance.get(`/api/products/get_user_products/${values.id}`);//id,arr
        console.log("after getting.. ",result);
        return result.data;
    }
    catch(err){
        return rejectWithValue(err.response.data);
    }
})
const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:localStorage.getItem("token"),
        _id:"",
        name:"",
        email:"",
        products:[],
        registerStatus:"",
        registerError:"",
        loginStatus:"",
        getStatus:"",
        logoutStatus:"false",
        updateStatus:"",
        loginError:"",
        userLoaded:false,
        Admin:false
    },
    reducers:{
        loadUser:(state,action)=>{
            const token=state.token;
            if(token)
            {
                state.logoutStatus="false";
                const user=jwtDecode(token);
                console.log("user user",user);
                return {
                    ...state,
                    token,
                    name:user.name,
                    email:user.email,
                    _id:user._id,
                    //products:user.products,
                    userLoaded:true,
                    Admin:user.isAdmin
                }
            }
        },
        update_logout_status:(state,action)=>{
            state.logoutStatus="false";
        },
        lougout:(state,action)=>{
            localStorage.removeItem("token");
            localStorage.removeItem("googleToken");//,response.credential);
            //localStorage.removeItem("ca")
            return{
                ...state,
                token:"",
                _id:"",
                name:"",
                email:"",
                registerStatus:"",
                registerError:"",
                loginStatus:"",
                logoutStatus:"true",
                products:[],
                loginError:"",
                userLoaded:false,
                Admin:false
            }
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state,action)=>{
            return {...state,registerStatus:"pending",registerError:""}
        });
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            console.log("token success",action.payload);
            toast.success(`you logged in`, {
                position: "bottom-left"
            });
            if(action.payload){const user=jwtDecode(action.payload);return {...state,token:action.payload,name:user.name,email:user.email,_id:user._id,Admin:user.isAdmin,registerStatus:"success",registerError:""}}
            else return state;
        });
        builder.addCase(registerUser.rejected,(state,action)=>{
            return {...state,registerStatus:"rejected",registerError:action.payload}
        });
        ////
        builder.addCase(loginUser.pending,(state,action)=>{
            return {...state,loginStatus:"pending",loginError:""}
        });
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            console.log("token success",action.payload);
            toast.success(`you logged in`, {
                position: "bottom-left"
            });
            //alert(action.payload)
            if(action.payload){const user=jwtDecode(action.payload);return {...state,token:action.payload,name:user.name,email:user.email,Admin:user.isAdmin,_id:user._id,loginStatus:"success",loginError:""}}
            else return state;
        });
        builder.addCase(loginUser.rejected,(state,action)=>{
            return {...state,loginStatus:"rejected",loginError:action.payload}
        });

        builder.addCase(update_user_products.pending,(state,action)=>{
            return {...state,updateStatus:"pending"}
        });
        builder.addCase(update_user_products.fulfilled,(state,action)=>{
            //console.log("token success",action.payload);
            //toast.success(`you logged in`, {position: "bottom-left"});
            //alert(action.payload)
            //console.log("fulfilled",action.payload);
            //if(action.payload){const user=jwtDecode(action.payload);return {...state,token:action.payload,name:user.name,email:user.email,Admin:user.isAdmin,_id:user._id,loginStatus:"success",loginError:""}}
            //else return state;
            //alert("aa",action.payload.length);
            return {...state,updateStatus:"success"}
        });
        builder.addCase(update_user_products.rejected,(state,action)=>{
            return {...state,updateStatus:"rejected"}
        });

        builder.addCase(get_user_products.pending,(state,action)=>{
            return {...state,getStatus:"pending"}
        });
        builder.addCase(get_user_products.fulfilled,(state,action)=>{
            return {...state,products:action.payload,getStatus:"success"}
        });
        builder.addCase(get_user_products.rejected,(state,action)=>{
            return {...state,products:action.payload,getStatus:"rejected"}
        });
    }
});
export const {loadUser,lougout,update_logout_status}=authSlice.actions;
export default authSlice.reducer;