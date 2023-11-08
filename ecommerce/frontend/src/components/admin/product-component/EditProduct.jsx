import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsUpdate } from '../../../features/productSlice';
import { getTotal, removeFromCart } from '../../../features/cartSlice';
//import { productsCreate } from '../../../features/productSlice';


export default function Edit_Product({editProd}) {
    console.log("edit: ",editProd);
    const dispatch=useDispatch();
    //const dispatch=useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [pprod,setPprod]=useState({});

  //const handleDelete=(prod)=>{
    //dispatch(productsDelete(prod.id));
    //setPprod(prod);
  //}
  const prod=useSelector(state=>state.product);
  const cart=useSelector(state=>state.cart);
  useEffect(()=>{
    if(prod.updateStatus=="success"&&pprod)
    {
      ////////////////
      
      dispatch(removeFromCart(pprod));
      //prod.deleteStatus="";
      setPprod({});
    }
  },[prod.updateStatus,dispatch]);
  useEffect(()=>{
    dispatch(getTotal());
  },[cart.items]);



  ///
  const [productImage,setProductImage]=useState(editProd.image);
  const [name,setName]=useState(editProd.pName);
  const [price,setPrice]=useState(editProd.pPrice);
  const [desc,setDesc]=useState("");
  const [brand,setBrand]=useState(editProd.pBrand);
  const [description,setDescription]=useState(editProd.pDesc);
  const [product_quantity,setProductQuantity]=useState(editProd.product_quantity);///


  const handle_product_image=(e)=>{
    const file =e.target.files[0];
    transform(file);
    //console.log(file);
  }
  //console.log(productImage);
  const transform=(file)=>{
    const reader=new FileReader();
    //console.log(file);
    if(file)
    {
      reader.readAsDataURL(file);
      
      reader.onloadend=async()=>{
        setProductImage(reader.result);
      }
    }
    else setProductImage("");
  }
  const [errorMessage,setErrorMessage]=useState("");
  
  const submit=(e)=>{
    e.preventDefault();
    //console.log(name,brand,price,description)
    if(isNaN(Number(price)))
    {
      setErrorMessage("the price feild should be number");
      return;
    }
    else setErrorMessage("");
    
    dispatch(productsUpdate({id:editProd.id,sr:productImage,name,brand,price,desc:description,product_quantity:product_quantity}));
    setPprod({id:editProd.id,name});
    console.log(pprod);
    
    //console.log({name,brand,description,productImage,price});
  }
  const product=useSelector(state=>state.product);






  return (
    <div>
      <Edit onClick={handleClickOpen}>
        Edit
      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
                <div className='create-product-form'>
            <form className='styledForm' onSubmit={submit}>
                <h3>Create product</h3>
                <input  className='inputs' type='file' accept='image/' onChange={handle_product_image} />
                <input value={name} className='inputs' type='text' placeholder='product name' required onChange={(e)=>setName(e.target.value) }/>
                <select value={brand} className='inputs' onChange={(e)=>setBrand(e.target.value) } required>
                  <option value="">Select Category</option>
                  <option value="phone">phone</option>
                  <option value="labtop">labtop</option>
                  <option value="smart watch">smart watch</option>
                  <option value="other">Other</option>
                    
                </select>
                <input value={price} className='inputs' type='text' placeholder='product price' required onChange={(e)=>setPrice(e.target.value) }/>
                
                <input value={product_quantity} className='inputs' type='number' placeholder='product quantity' required onChange={(e)=>setProductQuantity(e.target.value) }/>

                <input value={description} className='inputs' type='text' placeholder='product description' required onChange={(e)=>setDescription(e.target.value) }/>
                {product.updateStatus=="pending"?<button type='submit' className='primaryBut' disabled={true} style={{"background-color":"gray"}}>Waiting...</button>:<button type='submit' className='primaryBut' disabled={false}>Update</button>}
                {errorMessage?<div style={{"color":"red"}}>* {errorMessage}</div>:null}
                
            </form>
            
            <div className='imagePreview'>
                {productImage?<img src={productImage} ></img>:<p>Image preview will apear here!</p>}
                
            </div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const Edit=styled.button`
border:none;
outline:none;
padding:3px 5px;
color:white;
border-radius:3px;
cursor:pointer;
background-color:#4b70e2;
`;
