import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {FaUsers,FaStore,FaClipboard,FaTachometerAlt} from 'react-icons/fa'
export default function Dashbord() {
  const auth=useSelector(state=>state.auth);
  const navigate=useNavigate();
  useEffect(()=>{
    if(auth.Admin==false)
    {
      navigate("/");
    }
  },[auth.Admin]);
  return (
    <div className='dashbord'>
        <div className='sidenav'>
            <h3>Quick links</h3>
            
            <NavLink to="/admin/summary"  className={({isActive})=>isActive?"active":"nactive"}> <FaTachometerAlt/> Summary</NavLink>
            <NavLink to="/admin/products" className={({isActive})=>isActive?"active":"nactive"}> <FaStore/> Products</NavLink>
            <NavLink to="/admin/orders"   className={({isActive})=>isActive?"active":"nactive"}> <FaClipboard/> Orders</NavLink>
            <NavLink to="/admin/users"    className={({isActive})=>isActive?"active":"nactive"}> <FaUsers/> Users</NavLink>
        </div>
        <div className='content'>
            <Outlet/>
        </div>
        
    </div>
  )
}










/*const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;
*/