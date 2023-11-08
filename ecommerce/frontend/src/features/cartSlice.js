import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
//var mp=new Map();

export const update_cart=createAsyncThunk("cart/update_cart",async(id)=>{
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
        const result=await  instance.get(`/api/products/get_user_products/${id}`);
  
        console.log("result ook: ",result);
  
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
  export const get_products=createAsyncThunk("cart/get_products",async(values,{rejectWithValue})=>{
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

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        cartTotalQuantity:0,
        cartTotalPrice:0,
        get_user_productsStatus:"",
        get_status:"",
        clear_status:"",
        ids:localStorage.getItem("ids")?JSON.parse(localStorage.getItem("ids")):[],
        //mp
    },
    reducers:{
        addToCart:(state,action)=>{
            //console.log("from cart slice adding: ",action.payload);
            const indexItem=state.items.findIndex((element)=>(element.id===action.payload.id));
            if(indexItem>=0)
            {
                state.items[indexItem].quantity++;
                toast.info(`increased ${action.payload.name} quantity`, {
                    position: "bottom-left",
                    duration: 5000,
                    style: {
                        backgroundColor: 'white',
                        color: 'black',
                        },
                    });
                //state.mp.set(action.payload.id,state.items[indexItem].quantity);
            }
            else 
            {
                //331687711665-ge01aaavs6re17i8dti2e5guvr9ugl2k.apps.googleusercontent.com
                //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
                //331687711665-ugudsjo42naubqevb09alrjiv491i4bk.apps.googleusercontent.com
                //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

                const tempProduct={...action.payload,quantity:1};
                state.ids.push(tempProduct.id);
                console.log("from adding...: ",state.ids[0]);
                //console.log("from adding...: ",state.ids);
                state.items.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`, {
                    position: "bottom-left",
                });
                //state.mp.set(action.payload.id,1);
            }
            state.clear_status="false";
            localStorage.setItem("cartItems",JSON.stringify(state.items));
            localStorage.setItem("ids",JSON.stringify(state.ids));
            //localStorage.setItem("mp",JSON.stringify(state.mp));
        },
        removeFromCart:(state,action)=>{
            state.clear_status="true";
            console.log("action payload from remove from cart: ",action.payload);

            const newArr=state.items.filter((element)=>action.payload.id!==element.id);
            const newIds=state.ids.filter((element)=>action.payload.id!==element);
            //state.mp.delete(action.payload.id);
            console.log("from removing...: ",state.ids[0]);
            state.ids=newIds;
            //if(newArr.length==state.items.length){return;}
            if(action.payload.name&&newArr.length!=state.items.length)
            {
                toast.error(`${action.payload.name} removed from cart`, {
                position: "bottom-left",
                style: {
                    backgroundColor: 'white',
                    color: 'black',
                },
                });
            }
            state.items=newArr;
            //localStorage.removeItem("cartItems");
            localStorage.setItem("cartItems",JSON.stringify(state.items));
            localStorage.setItem("ids",JSON.stringify(state.ids));
            //localStorage.setItem("mp",JSON.stringify(state.mp));
        },
        clearCart:(state,action)=>{
            state.items=[];
            state.ids=[];
            state.clear_status="true";
            //state.mp.clear();
            toast.error(`Cart Cleared`, {
                position: "bottom-left",
                style: {
                    backgroundColor: 'white',
                    color: 'black',
                },
            });
            state.cartTotalQuantity=0;
            state.cartTotalPrice=0;
            localStorage.setItem("cartItems",JSON.stringify(state.items));
            localStorage.setItem("ids",JSON.stringify(state.ids));
            //localStorage.setItem("mp",JSON.stringify(state.mp));
        },
        increaseCart:(state,action)=>{
            const index=state.items.findIndex((element)=>action.payload.id===element.id);
            state.items[index].quantity+=1;
            state.clear_status="false";
            //const f=action.payload.id,s=state.items[index].quantity;
            //state.mp.set(action.payload.id,state.items[index].quantity);
            //state.mp.set("n1",1);
            //const mpp=new Map();
            //mpp.set(f,s);
            //state.mp.set(f,s);
            //console.log("mpp ",mpp);
            //console.log("mp ",state.mp);
            //console.log("action.payload.id: ",action.payload.id);
            //console.log("state.items[index].quantity ",state.items[index].quantity);
            toast.info(`increased ${action.payload.name} quantity`, {
                position: "bottom-left",
                duration: 5000,
                style: {
                    backgroundColor: 'white',
                    color: 'black',
                },
            });
            localStorage.setItem("cartItems",JSON.stringify(state.items));
            localStorage.setItem("ids",JSON.stringify(state.ids));
            //localStorage.setItem("mp",JSON.stringify(state.mp));
        },
        decreaseCart:(state,action)=>{
            
            const index=state.items.findIndex((element)=>action.payload.id===element.id);
            if(state.items[index].quantity>1)
            {
                state.items[index].quantity-=1;
                //state.mp.set(action.payload.id,state.items[index].quantity);
            
                toast.info(`decreased ${action.payload.name} quantity`, {
                    position: "bottom-left",
                    duration: 5000,
                    style: {
                        backgroundColor: 'white',
                        color: 'black',
                    },
                });

                localStorage.setItem("cartItems",JSON.stringify(state.items));
                localStorage.setItem("ids",JSON.stringify(state.ids));
                state.clear_status="false";
                //localStorage.setItem("mp",JSON.stringify(state.mp));
            }
            else 
            {
                const newArr=state.items.filter((element)=>action.payload.id!==element.id);
                state.items=newArr;
                const newIds=state.ids.filter((element)=>action.payload.id!==element);
                //state.mp.delete(action.payload.id);
                console.log("from removing...: ",state.ids[0]);
                state.ids=newIds;
                //state.mp.delete(action.payload.id);
                //localStorage.removeItem("cartItems");
                localStorage.setItem("cartItems",JSON.stringify(state.items));
                toast.error(`${action.payload.name} removed from cart`, {
                    position: "bottom-left",
                    style: {
                    backgroundColor: 'white',
                    color: 'black',
                    },
                });
                state.clear_status="true";
                localStorage.setItem("cartItems",JSON.stringify(state.items));
                localStorage.setItem("ids",JSON.stringify(state.ids));
                //localStorage.setItem("mp",JSON.stringify(state.mp));
            }
        },
        getTotal:(state,action)=>{
            state.clear_status="false";
            let {totall,quantityy}=state.items.reduce((cartTotal,cartItem)=>{
                const {price,quantity}=cartItem;
                const itemTotal=price*quantity;
                cartTotal.totall+=itemTotal;
                cartTotal.quantityy+=quantity;
                return cartTotal;
            },{totall:0,quantityy:0});
            state.cartTotalPrice=totall;
            state.cartTotalQuantity=quantityy;
            //alert(quantityy);
        },
        setCart:(state,action)=>{
            state.items=action.payload;
            var newArr=[];
                //console.log("shady shady shady",action.payload);
                for(var i=0;i<state.items.length;i++)
                {
                    //if(!state.ids.includes(state.items[i]))
                    newArr.push(state.items[i].id);
                }
                state.ids=newArr;
            localStorage.setItem("ids",JSON.stringify(newArr));
            localStorage.setItem("cartItems",JSON.stringify(state.items));
        },
        updateCart:(state,action)=>{
            console.log("action.payload",action.payload);
                //state.items=action.payload;
                for(var i=0;i<action.payload.length;i++)
                {
                    //if(!state.items.includes(action.payload[i]))
                    //{
                       // alert("yes");

                    //    continue;
                    //}
                    //else {
                        //alert("no");
                        
                        state.items.push(action.payload[i]);
                    //}
                }
                state.clear_status="false";
                var newArr=[];
                console.log("shady shady shady",action.payload);
                for(var i=0;i<state.items.length;i++)
                {
                    //if(!state.ids.includes(state.items[i]))
                    newArr.push(state.items[i].id);
                }
                state.ids=newArr;

            //console.log("from Update cart 1: ",action.payload);
            //console.log("from Update cart 2: ",state.items);
                
            //}
            localStorage.setItem("ids",JSON.stringify(newArr));
            localStorage.setItem("cartItems",JSON.stringify(state.items));
        }
    },
    extraReducers:{
        [update_cart.pending]:(state,action)=>{
            state.get_status="pending";
        }
        ,[update_cart.rejected]:(state,action)=>{
            state.get_status="error";
            //console.log()
        },
        [update_cart.fulfilled]:(state,action)=>{
            //console.log(action.payload);
            //console.log()
            state.get_status="success";
            if(action.payload){
                //console.log("result action payload1",action.payload);
                //console.log("result action payload2",JSON.stringify(action.payload));
                
                //localStorage.setItem("cartItems",JSON.stringify(action.payload));
                
                state.items=action.payload;
                //state.ids=[];
                var newIds=[];
                for(var i=0;i<state.items.length;i++)
                {
                    newIds.push(state.items[i].id);
                }
                state.ids=newIds;
                localStorage.setItem("ids",JSON.stringify(state.ids));
                localStorage.setItem("cartItems",JSON.stringify(state.items));
            }
        },


        [get_products.pending]:(state,action)=>{
            state.get_user_productsStatus="pending";
        }
        ,[get_products.rejected]:(state,action)=>{
            state.get_user_productsStatus="error";
            //console.log()
        },
        [get_products.fulfilled]:(state,action)=>{
            //console.log(action.payload);
            console.log("getting getting",action.payload);
            state.get_user_productsStatus="success";
            //if(action.payload){
                state.items=action.payload;
                //state.ids=[];
                var newIds=[];
                for(var i=0;i<state.items.length;i++)
                {
                    newIds.push(state.items[i].id);
                }
                state.ids=newIds;
                localStorage.setItem("ids",JSON.stringify(state.ids));
                localStorage.setItem("cartItems",JSON.stringify(state.items));
            //}
        },
    }
});
export const {addToCart,setCart,removeFromCart,clearCart,increaseCart,decreaseCart,getTotal,updateCart}=cartSlice.actions;
export default cartSlice.reducer;