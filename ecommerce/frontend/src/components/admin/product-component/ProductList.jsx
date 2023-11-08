//import React from 'react'

/*export default function ProductList() {
  return (
    <div>ProductList</div>
  )
}*/
import styled from 'styled-components';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { insert, productsDelete } from '../../../features/productSlice';
import { useEffect,useState } from 'react';
import { getTotal, removeFromCart } from '../../../features/cartSlice';
import EditProduct from './EditProduct';
import Edit_Product from './EditProduct';
import { toast } from 'react-toastify';
import axios from 'axios';



/*const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];*/

export default function ProductList() {
    
    var {items}=useSelector(state=>state.product);
    const prod=useSelector(state=>state.product);
    const cart=useSelector(state=>state.cart);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handle_increase=async(product)=>{
      /**/
      //alert("e")
      const token=localStorage.getItem("token");
      //alert("old_product._id")
        const instance = axios.create({
            baseURL: 'http://localhost:5000/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        //alert(values.value.length)
        const result=await  instance.post(`http://localhost:5000/api/users/increase_product_quantity/${product.id}`);
        //alert(old_product.id);
        console.log(result);
        //console.log(old_product);
        //const old_product=await axios.get(`http://localhost:5000/api/users/get_product/${product.id}`);
      /*const obj={
        name:old_product.data.name,
        brand:old_product.data.brand,
        desc:old_product.data.desc,
        price:old_product.data.price,
        _id:old_product.data._id,
        sr:old_product.data.sr,
        product_quantity:old_product.data.product_quantity+1,
      }
      const instance2 = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    //alert(values.value.length)
    
      const new_product=await  instance1.post(`http://localhost:5000/api/users/update_product/${old_product.data._id}`,obj);*/
      //const new_product=await axios.post(`http://localhost:5000/api/users/update_product/${old_product._id}`)
      if(result.status==200)toast.info("quantity increased successfully");
      else toast.error("error occured");
    }
    const handle_decrease=async(product)=>{
      if(product.product_quantity==0)
      {
        toast.error("the product quantity is zero");
        return;
      }
      const token=localStorage.getItem("token");
      //alert("old_product._id")
        const instance = axios.create({
            baseURL: 'http://localhost:5000/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        //alert(values.value.length)
        const result=await  instance.post(`http://localhost:5000/api/users/decrease_product_quantity/${product.id}`);
        console.log(result);
       
      if(result.status==200)toast.info("quantity decreased successfully");
      else toast.error("error occured");
    }
    //const resut=await axios("");
    //useEffect(()=>{
    //  dispatch(insert());
    //},[prod,dispatch]);
    //const mem=React.useMemo(()=>{return prod},[prod,dispatch]);
    console.log("items: ",items);
    const [idd,setIdd]=useState("");
    const [pprod,setPprod]=useState({});


    //useEffect(()=>{
      
    //},[dispatch,items]);
    const handleDelete=(prod)=>{
      dispatch(productsDelete(prod.id));
      setPprod(prod);
    }
    
    useEffect(()=>{
      if(prod.deleteStatus=="success"&&pprod)
      {
        ////////////////
        const newProduct={
          name:pprod.pName,
          brand:pprod.pBrand,
          desc:pprod.pDesc,
          price:pprod.pPrice,
          id:pprod.id,
          sr:pprod.image,
          product_quantity:pprod.product_quantity?pprod.product_quantity:0,
          sold:pprod.sold?pprod.sold:0
        }
        dispatch(removeFromCart(newProduct));
        //prod.deleteStatus="";
        setPprod({});
      }
    },[prod.deleteStatus,prod.updateStatus,dispatch]);
    useEffect(()=>{
      dispatch(getTotal());
    },[cart.items]);

    var row=items&&items.map((item)=>{
      return {
          id:item.id,
          image:item.sr,
          pName:item.name,
          pBrand:item.brand,
          pDesc:item.desc,
          pPrice:item.price.toLocaleString(),
          product_quantity:item?.product_quantity,
          sold:item.sold?item.sold:0
      }
  });
  var columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'image', headerName: 'Image', width: 80 
        ,renderCell:(params)=>{
            return (
                <ImageContainer>
                <img src={params.row.image}></img>
                </ImageContainer>
            )
        }
    },
    { field: 'pName', headerName: 'Name', width: 130 },
    { field: 'pPrice',headerName: 'Price',width: 80,},
    { field: 'pDesc',headerName: 'Description',width: 140,},
    { field: 'product_quantity',headerName: 'Quantity',width: 110,renderCell:(params)=>{
      //alert(params.row.id);
      return (
        <>
          <But onClick={(e)=>handle_decrease(params.row)}>-</But>
          <div> {params.row.product_quantity?params.row.product_quantity:0} </div>
          <But onClick={(e)=>handle_increase(params.row)}>+</But>
          
        </>
      )
    }},
    { field: 'sold',headerName: 'Sold',width: 50,},
    { field: 'actions',headerName: 'Actions',sortable: false,width: 170
    ,renderCell:(params)=>{
        //console.log(params);
        return (
            <Actions>
              
                <Delete onClick={()=>handleDelete(params.row)}>Delete</Delete>
                <Edit_Product editProd={params.row}/>
                <View onClick={()=>navigate(`/product_details/${params.row.id}`)}>View</View>
                
            </Actions>
        )
    }
    },
  ];
    //const [rowss,setRowss]=useState([{}]);
    //const [columnss,setColumnss]=useState([{}]);
    
    useEffect(()=>{
      
        row=items&&items.map((item)=>{
        return {
            id:item.id,
            image:item.sr,
            pName:item.name,
            pBrand:item.brand,
            pDesc:item.desc,
            pPrice:item.price.toLocaleString(),
            product_quantity:item.product_quantity?item.product_quantity:0,
            sold:item.sold?item.sold:0
        }
    });
    //setRowss(row);
        columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'image', headerName: 'Image', width: 80 
            ,renderCell:(params)=>{
                return (
                    <ImageContainer>
                    <img src={params.row.image}></img>
                    </ImageContainer>
                )
            }
        },
        { field: 'pName', headerName: 'Name', width: 130 },
        { field: 'pPrice',headerName: 'Price',width: 80,},
        { field: 'pDesc',headerName: 'Description',width: 130,},
        { field: 'product_quantity',headerName: 'Quantity',width: 110,renderCell:(params)=>{
          return (
            <>
              <But onClick={(e)=>handle_decrease(params.row)}>-</But>
              <div> {params.row.product_quantity?params.row.product_quantity:0} </div>
              <But onClick={(e)=>handle_increase(params.row)}>+</But>
              
            </>
          )
        }},
        { field: 'sold',headerName: 'Sold',width: 50,},
        { field: 'actions',headerName: 'Actions',sortable: false,width: 170
        ,renderCell:(params)=>{
            //console.log(params);
            return (
                <Actions>
                    <Delete onClick={()=>handleDelete(params.row.id)}>Delete</Delete>
                    <Edit_Product />
                    <View onClick={()=>navigate(`/product_details/${params.row.id}`)}>View</View>
                    
                </Actions>
            )
        }
        },
      ];
      //setColumnss(columns);

    },[items,prod.updateStatus,prod.createStatus,prod.deleteStatus]);
    console.log(items.length);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={row}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]} 
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}


const ImageContainer=styled.div`
img{
    height:40px;
}
`
const But=styled.button`
cursor:pointer;
padding:0.3rem;
margin:0.3rem;
outline:none;
border:none;
color:white;
background:brown;
`

const Actions=styled.div`
width:100%;
display:flex;
justify-content:space-between;
button{
    border:none;
    outline:none;
    padding:3px 5px;
    color:white;
    border-radius:3px;
    cursor:pointer;
}

`

const Delete=styled.button`
background-color:rgb(255,77,73);

`
const View=styled.button`
background-color:rgb(114,225,40);
`
