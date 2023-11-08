 //import React from 'react'

/*export default function ProductList() {
  return (
    <div>ProductList</div>
  )
}*/
/*import styled from 'styled-components';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { productsDelete } from '../../../features/productSlice';
import { useEffect,useState } from 'react';
//import { getTotal, removeFromCart } from '../../../features/cartSlice';
import moment from 'moment';
import { delete_user, make_admin, users } from '../../../features/userSlice';
//import { orders, update_orders } from '../../../features/orderSlice';
//import EditProduct from './EditProduct';
//import Edit_Product from './EditProduct';



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

/*export default function Users() {
    
    //var {items}=useSelector(state=>state.order);

    //const prod=useSelector(state=>state.product);
    //const order=useSelector(state=>state.order);
    //const cart=useSelector(state=>state.cart);
    
    
    
    
    
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {items}=useSelector(state=>state.user);
    const handle_delete=(id)=>{
        //alert(id);
        dispatch(delete_user(id));
    }
    const handle_make_customer=(id)=>{
        //alert(id);
        dispatch(make_admin({id,value:"Customer"}));
    }
    const handle_make_admin=(id)=>{
        dispatch(make_admin({id,value:"Admin"}));
        //alert(id);
        //dispatch(delete_user(id));
    }
    
    useEffect(()=>{
        dispatch(users());
    },[items,dispatch]);
    
    
    //useEffect(()=>{
        //dispatch();
    //},[])
    

    //useEffect(()=>{
    //useEffect(()=>{
    //},[])
    //},[items,prod.updateStatus,prod.createStatus,prod.deleteStatus]);
    
    console.log("users list: ",items);
    //const items=order.items;
    const [idd,setIdd]=useState("");
    const [pprod,setPprod]=useState({});
    //const handleDelete=(prod)=>{
      //dispatch(productsDelete(prod.id));
      //setPprod(prod);
    //}
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
          sr:pprod.image
      }
        dispatch(removeFromCart(newProduct));
        //prod.deleteStatus="";
        setPprod({});
      }
    },[prod.deleteStatus,prod.updateStatus]);*/
    //useEffect(()=>{
    //  dispatch(getTotal());
    //},[cart.items]);
    //const handle_delivered


/*    var row=items&&items.map((item)=>{
        //console.log("row",item);
      return {
          id:item._id,
          name:item.name,
          email:item.email,
          Role:item?.isAdmin?"Admin":"Customer",
      }
  });
  var columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 140},
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'role',headerName: 'Role',width: 120,
        renderCell:(params)=>{
            return (
                <>
                    {params.row.Role=="Admin"?<Pending>Admin</Pending>:null}
                    {params.row.Role=="Customer"?<Delivered>Customer</Delivered>:null}
                    {params.row.Role=="dispatched"?<Dispatched>dispatched</Dispatched>:null}
                </>
            )
        }
    },
    { field: 'actions',headerName: 'Actions',sortable: false,width: 240
    ,renderCell:(params)=>{
        //console.log(params);<Edit_Product editProd={params.row}/>
        return (
            
                <Actions>
                <DispatchedBtn onClick={()=>handle_delete(params.row.id)}> Deleted</DispatchedBtn>
                {params.row.Role=="Admin"?<DeliveredBtn onClick={()=>handle_make_customer(params.row.id)}>Customer</DeliveredBtn>:<DeliveredBtn onClick={()=>handle_make_admin(params.row.id)}>Admin</DeliveredBtn>}
                <View onClick={()=>navigate(`/user_details/${params.row.id}`)}>View</View>
                </Actions>
        )
    }
    },
  ];
    

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

  return (<div>shady</div>)
}


const ImageContainer=styled.div`
img{
    height:40px;
}
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
}`

const Pending=styled.div`
padding:3px 5px;
color:rgb(253,181,40);
background-color:rgb(253,181,40,0.12);
border-radius:3px;
font-size:14px;
`;
const Dispatched=styled.div`
padding:3px 5px;
color:rgb(255,77,73);
background-color:rgba(255,77,73,0.12);
border-radius:3px;
font-size:14px;
`;
/*#4b70e2;*/
/*const Delivered=styled.div`
padding:3px 5px;
color:rgb(75, 112, 226);
background-color:rgba(75, 112, 226,0.12);
border-radius:3px;
font-size:14px;
`;
const DispatchedBtn=styled.button`
background-color:rgb(255,77,73);
`
const View=styled.button`
background-color:rgb(114,225,40);
`
const DeliveredBtn=styled.button`
background-color:rgb(102,108,255);
`*/






















import { QueryClientProvider, useQuery } from 'react-query';
import { QueryClient } from 'react-query/lib/core';
import moment from 'moment';
import styled from 'styled-components';
import * as React from 'react';
import { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { update_orders } from '../../../features/orderSlice';
import axios from 'axios';
import { delete_user, make_admin, users } from '../../../features/userSlice';
//import { deepEqual } from 'react-redux';
const User = () => {
  const queryClient = new QueryClient({
    // Options
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
};

const MyComponent = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  dispatch(users());
  const handle_delete=(id)=>{
    //alert(id);
    dispatch(delete_user(id));
}
const handle_make_customer=(id)=>{
    //alert(id);
    dispatch(make_admin({id,value:"Customer"}));
}
const handle_make_admin=(id)=>{
    dispatch(make_admin({id,value:"Admin"}));
    //alert(id);
    //dispatch(delete_user(id));
}
  //dispatch(users());

  //const user = useSelector(state => state.user);
  //const user = useSelector(state => state.user);

  //const memoizedUsers = useMemo(() => user, [user===user]);
  //const memoizedUsers = React.useMemo(() => user, [user]);
  //const {items}=useSelector(state=>state.user);
  //const user=useSelector(state=>state.user);
  const { data, isLoading, error } = useQuery('myOrders', async () => {
    const token=localStorage.getItem("token");
    const instance1 = axios.create({
      baseURL: 'http://localhost:5000/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data=await instance1.get('/api/users/get_users');
    //const response = await fetch('http://localhost:5000/api/orders/get_orders');
    //const data = await response.json();
    return data.data;
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  /*const row=data&&data.map((item)=>{
    //console.log("row",item);
  return {
      id:item?._id,
      name:item?.shipping.name,
      amount:(item?.total/100).toLocaleString(),
      status:item?.delivery_status,
      dat:moment(item?.createdAt).fromNow()
      
  }
});
//useNavigate=useNavigate
const handle_dispatch=(prod)=>{
  dispatch(update_orders({id:prod.id,value:"dispatched"}))
}
const handle_delivered=(prod)=>{
  dispatch(update_orders({id:prod.id,value:"delivered"}));
}
  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 140},
    { field: 'amount', headerName: 'Amount($)', width: 100 },
    { field: 'status',headerName: 'Status',width: 100,
        renderCell:(params)=>{
            return (
                <>
                    {params?.row?.status=="pending"?<Pending>Pending</Pending>:null}
                    {params?.row?.status=="delivered"?<Delivered>delivered</Delivered>:null}
                    {params?.row?.status=="dispatched"?<Dispatched>dispatched</Dispatched>:null}
                </>
            )
        }
    },
    { field: 'dat',headerName: 'Date',width: 130,},
    { field: 'actions',headerName: 'Actions',sortable: false,width: 300
    ,renderCell:(params)=>{
        //console.log(params);<Edit_Product editProd={params.row}/>
        //onClick={()=>handle_dispatch(params?.row)}
        //onClick={()=>handle_delivered(params?.row)}
        //onClick={()=>navigate(`/order_details/${params?.row?.id}`)}
        return (
            
                <Actions>
                <DispatchedBtn onClick={()=>handle_dispatch(params?.row)}>Dispatched</DispatchedBtn>
                <DeliveredBtn onClick={()=>handle_delivered(params?.row)}>Delivered</DeliveredBtn>
                <View onClick={()=>navigate(`/order_details/${params?.row?.id}`)}>View</View>
                </Actions>
        )
    }
    },
  ];*/

console.log("data ",data);
      const row=data&&data.map((item)=>{
        //console.log("row",item);
      return {
          id:item._id,
          name:item.name,
          email:item.email,
          Role:item?.isAdmin?"Admin":"Customer",
      }
  });
  var columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 140},
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'role',headerName: 'Role',width: 120,
        renderCell:(params)=>{
            return (
                <>
                    {params.row.Role=="Admin"?<Pending>Admin</Pending>:null}
                    {params.row.Role=="Customer"?<Delivered>Customer</Delivered>:null}
                    {params.row.Role=="dispatched"?<Dispatched>dispatched</Dispatched>:null}
                </>
            )
        }
    },
    { field: 'actions',headerName: 'Actions',sortable: false,width: 240
    ,renderCell:(params)=>{
        //console.log(params);<Edit_Product editProd={params.row}/>
        return (
            
                <Actions>
                <DispatchedBtn onClick={()=>handle_delete(params.row.id)}> Deleted</DispatchedBtn>
                {params.row.Role=="Admin"?<DeliveredBtn onClick={()=>handle_make_customer(params.row.id)}>Customer</DeliveredBtn>:<DeliveredBtn onClick={()=>handle_make_admin(params.row.id)}>Admin</DeliveredBtn>}
                <View onClick={()=>navigate(`/user_details/${params.row.id}`)}>View</View>
                </Actions>
        )
    }
    },
  ];


  return (
    <div>
      {row.map((order) =>{
        console.log(order)
      })}

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
    </div>
  );
};



const ImageContainer=styled.div`
img{
    height:40px;
}
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
}`

const Pending=styled.div`
padding:3px 5px;
color:rgb(253,181,40);
background-color:rgb(253,181,40,0.12);
border-radius:3px;
font-size:14px;
`;
const Dispatched=styled.div`
padding:3px 5px;
color:rgb(255,77,73);
background-color:rgba(255,77,73,0.12);
border-radius:3px;
font-size:14px;
`;
const Delivered=styled.div`
padding:3px 5px;
color:rgb(75, 112, 226);
background-color:rgba(75, 112, 226,0.12);
border-radius:3px;
font-size:14px;
`;
const DispatchedBtn=styled.button`
background-color:rgb(255,77,73);
`
const View=styled.button`
background-color:rgb(114,225,40);
`
const DeliveredBtn=styled.button`
background-color:rgb(102,108,255);
`

export default User;













