//import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Navigate ,Router,Routes,Link, useNavigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart'
import NotFound from './components/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { insert } from './features/productSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckoutSuccess from './components/CheckoutSuccess';
import Dashbord from './components/admin/Dashbord';
import Products from './components/admin/products';//import Products from './components/admin/Products';
import Summary from './components/admin/summary';
import CreateProduct from './components/admin/CreateProduct';
import ProductList from './components/admin/product-component/ProductList';
import Order from './components/admin/Order';
import User from './components/admin/User';
import ProductDetails from './components/details/Product';
import UserProfile from './components/details/userProfile';
import OrderDetails from './components/details/Order';
import React, { useEffect, useState } from 'react';
import { get_user_products, loadUser, update_logout_status, update_user_products } from './features/authSlice';
import { updateCart,clearCart, get_products } from './features/cartSlice';
import { update_cart } from './features/cartSlice';
import ChoosePassword from './components/auth/ChoosePassword';
import ResetPassword from './components/auth/ResetPassword';
import RechangePassword from './components/auth/RechangePassword';
import MyOrders from './components/MyOrders';
import { GoogleMap,InfoWindowF, MarkerF,useJsApiLoader, useLoadScript  } from '@react-google-maps/api';
//import { LatLngBounds } from '@react-google-maps/core';
//import { Map, Marker } from 'react-google-maps';
function App() {
  //update user when clear and (remove up to zero)
  /*const markers = [
    { lat: 37.78825, lng: -122.4324 },
    { lat: 37.80025, lng: -122.4124 },
    { lat: 37.81525, lng: -122.3924 },
  ];*/

  //const bounds = new CoreLatLngBounds(markers);
  
  const cart=useSelector(state=>state.cart);
  const auth=useSelector(state=>state.auth);
  const dispatch=useDispatch();


  /*const [cart_items,set_cart_items]=useState(localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]);
  useEffect(()=>{
    //alert("up")
    set_cart_items(localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]);
    console.log("set_cart_items",cart_items);
  },[]);*/


//how to store in cash in react
  useEffect(()=>{
    if(auth.loginStatus=="success")
    {
      //localStorage.setItem("cartItems",JSON.stringify(auth.products));
      //ids
      dispatch(get_products({id:auth._id}));
      //console.log
      //dispatch(updateCart(auth.products));
      //dispatch(update_user_products({id:auth._id,value:cart.items}));
    }
  },[auth.loginStatus]);
  useEffect(()=>{
    if(localStorage.getItem("clear")=="clear")
    {
      localStorage.setItem("clear","c");
      dispatch(clearCart());
    }
  },[localStorage.getItem("clear")])


  //useEffect(()=>{
  //  if(auth.logoutStatus=="success")
  //  {
      //localStorage.setItem("cartItems",JSON.stringify(auth.products));
      //dispatch(updateCart(auth.products));
      //dispatch(update_user_products({id:auth._id,value:cart.items}));
  //  }
  //},[auth.loginStatus]);
  
  //useEffect(()=>{
    //alert(cart.items.length);
  //  console.log("shady",cart.items);
  //  dispatch(update_user_products({id:auth._id,value:cart.items}));
  //},[cart.items]);
  
  
  
  /*useEffect(()=>{
      //set_cart_items(JSON.parse(localStorage.getItem("cartItems")));
      //alert("up_cart");
      dispatch(updateCart(cart_items));
      if(auth._id)
      {
        //alert("up_user")
        alert(cart_items);
        dispatch(update_user_products({id:auth._id,value:cart_items}));
      }
    
  },[cart_items]);*/
  
  
  //,localStorage.getItem("cartItems")]);*/
  
  //const navigate=useNavigate();
  //useEffect(()=>{
  //  dispatch(clearCart());
  //},[localStorage.getItem("cartItems")=="[]"]);
  //if(!localStorage.getItem("cartItems"))alert("yes");


  /*useEffect(()=>{
    if(localStorage.getItem("cartItems")!="[]")
    dispatch(updateCart(JSON.parse(localStorage.getItem("cartItem"))));
  },[localStorage.getItem("cartItems")])

  useEffect(()=>{
    if(auth._id&&cart.clear_status=="true")
    {
      console.log("cleared...");
      dispatch(update_user_products({id:auth._id,value:cart.items}));
    }
  },[cart.clear_status]);
  useEffect(()=>{
    if(auth.loginStatus=="success")
    {
      
      dispatch(update_cart(auth._id));
      //localStorage.setItem("cartItems",JSON.stringify(auth.products));
      //console.log("id ",auth._id)
      //console.log("products",auth.products);
      //dispatch(updateCart(auth.products));
    }
  },[auth.loginStatus]);

  useEffect(()=>{
    //if(auth.loginStatus=="success")
    //{
      
    

    if(auth.logoutStatus=="true")
    {
      dispatch(clearCart());
      dispatch(update_logout_status());
    }
    //console.log("items changed ...",items);
    //dispatch(update_user_products({id:auth._id,value:cart.items}));//);
  },[auth.logoutStatus]);
  useEffect(()=>{
    //console.log("items changed ...",items);
    
    if(auth._id&&cart.items.length>0)
    {
      console.log("update user id",auth._id);
      console.log("update user products",cart.items);
      dispatch(update_user_products({id:auth._id,value:cart.items}));//);
    }
    
  },[cart,dispatch]);*/
  //useEffect(()=>{
  //  if(cart.items.length==0&&auth._id!=""&&auth.products.length>0)
  //  {

  //  }
  //},[cart,auth]);


  

  //const dispatch=useDispatch();
  //dispatch(insert("shady"));//<Route to="/not-found"/>
  const sssss=0;
  return (
    <div className="App">
      <ToastContainer /> 
     <BrowserRouter>
     
      <Navbar/>
      
      <Routes>
        <Route path='/cart'                 exact element={<Cart/>            }/>
        <Route path='/checkout-success'     exact element={<CheckoutSuccess/> }/>
        <Route path='/'                     exact element={<Home/>            }/>
        <Route path='/my-orders'            exact element={<MyOrders/>            }/>
        <Route path="/register"             exact element={<Register/>        }/>
        <Route path="/send-email"           exact element={<ResetPassword/>   }/>
        <Route path="/reset-password/:token" exact element={<RechangePassword/>   }/>
        <Route path="/login"                exact element={<Login/>           }/>
        <Route path="/enter-your-password"  exact element={<ChoosePassword/>           }/>
        <Route path="/product_details/:id"  exact element={<ProductDetails/>  }/>
        <Route path="/user_details/:id"     exact element={<UserProfile/>  }/>
        <Route path="/order_details/:id"    exact element={<OrderDetails/>  }/>
        
        <Route path="/admin"                 element={<Dashbord/>   }>
          <Route path="products"             element={<Products/>   }>
            <Route index element={<ProductList/>}/>
            <Route path="create-product"     element={<CreateProduct/>           }/>
          </Route>
          <Route path="summary"              element={<Summary/>    }/>
          <Route path="orders"               element={<Order/>    }/>
          <Route path="users"                element={<User/>    }/>
        </Route>
        <Route path='*'                           element={<NotFound/>        }/>
      </Routes>
 
     </BrowserRouter>
     
    </div>
  );
  /*const [center, setCenter] = React.useState({ lat: 37.78825, lng: -122.4324 });

  useEffect(() => {
    const loadMap = async () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 13,
      });

      const marker = new google.maps.Marker({
        position: center,
        map,
      });
    };

    loadMap();
  }, []);*/
  /*const [selectedLocation,setSelectedLocation]=useState({lat:30.020057,lng:31.285155})
  const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: 'AIzaSyAA6brVo97YgNB1rrFIeoTZMC4717Fd9Aw',
  });
  
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Maps";
  
  //setSelectedLocation({lat:26.820553,lng:30.802498})
  return (
    <div style={{ marginTop: "50px" }}>
      <GoogleMap
        apiKey='AIzaSyAA6brVo97YgNB1rrFIeoTZMC4717Fd9Aw'
        mapContainerStyle={{
          height: "800px",
        }}
        center={selectedLocation}
        zoom={8}
        onLoad={onMapLoad}
        suppressConsoleWarnings={true}
        
      >
        <MarkerF
          
          label='shady'
          animation='PULSE'
          position={selectedLocation}
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
        
      </GoogleMap>
    </div>
  );*/
}

export default App;
