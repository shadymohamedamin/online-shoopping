import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productsCreate } from '../../features/productSlice';

export default function CreateProduct() {
  const [productImage,setProductImage]=useState("");
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [desc,setDesc]=useState("");
  const [brand,setBrand]=useState("");
  const [description,setDescription]=useState("");
  const [quantity,setQuantity]=useState(0);
  /*const image_ref=useRef<HTMLInputElement>(null);
  const price_ref=useRef<HTMLInputElement>(null);
  const name_ref=useRef<HTMLInputElement>(null);
  const desc_ref=useRef<HTMLInputElement>(null);
  const brand_ref=useRef<HTMLInputElement>(null);*/
  
  const handle_product_image=(e)=>{
    const file =e.target.files[0];
    //const blob = new Blob([file]);
    //const imageUrl = URL.createObjectURL(blob);
    //setProductImage(imageUrl);
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
        
        /*const image = new Image();
        image.src = reader.result;
        console.log("before: ",image);
  // Resize the image to the desired width and height.
        //await image.resize(300, 300);
        console.log("after: ",image);
  // Convert the resized image to a string.
        const resizedImageData = image.toDataURL();*/
        //console.log("shady")
        setProductImage(reader.result);
      }
    }
    else setProductImage("");
  }
  const [errorMessage,setErrorMessage]=useState("");
  const dispatch=useDispatch();
  const submit=(e)=>{
    e.preventDefault();
    //console.log(name,brand,price,description)
    if(isNaN(Number(price)))
    {
      setErrorMessage("the price feild should be number");
      return;
    }
    else setErrorMessage("");
    
    dispatch(productsCreate({sr:productImage,name,brand,price,desc:description,product_quantity:quantity}));
    /*setProductImage("");//productImage
    setBrand("");
    setDescription("");
    setName("");
    setPrice("");*/
    //price_ref.current.value="";
  }

  //const but=useRe();
  //const [butName,setButName]=useState("Submit");
  const product=useSelector(state=>state.product);
  /*const problem=useMemo(()=>{
      if(product.createStatus=="rejected")
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
      else if(product.createStatus=="pending")
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
  },[product.createStatus]);*/


if(quantity<0)setQuantity(0);
  return (
    <div className='create-product-form'>
      <form className='styledForm' onSubmit={submit}>
        <h3>Create product</h3>
        <input  className='inputs' type='file' accept='image/' onChange={handle_product_image} required/>
        <input  className='inputs' type='text' placeholder='product name' required onChange={(e)=>setName(e.target.value) }/>
        <select className='inputs' onChange={(e)=>setBrand(e.target.value) } required>
            <option value="">Select Category</option>
            <option value="phone">phone</option>
            <option value="labtop">labtop</option>
            <option value="smart watch">smart watch</option>
            <option value="other">Other</option>
            
        </select>
        <input className='inputs' type='text' placeholder='product price' required onChange={(e)=>setPrice(e.target.value) }/>
        <input className='inputs' value={quantity} type='number' placeholder='product quantity' required onChange={(e)=>setQuantity(e.target.value) }/>
        <input className='inputs' type='text' placeholder='product description' required onChange={(e)=>setDescription(e.target.value) }/>
        {product.createStatus=="pending"?<button type='submit' className='primaryBut' disabled={true} style={{"background-color":"gray"}}>Waiting...</button>:<button type='submit' className='primaryBut' disabled={false}>Submit</button>}
        {errorMessage?<div style={{"color":"red"}}>* {errorMessage}</div>:null}
        
      </form>
      
      <div className='imagePreview'>
        {productImage?<img src={productImage} ></img>:<p>Image preview will apear here!</p>}
        
      </div>
    </div>
  )
}
/*
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
 */