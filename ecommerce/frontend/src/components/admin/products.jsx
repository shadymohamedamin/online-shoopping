import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Products() {
    const navigate=useNavigate();
  return (
    <>
      <div className="adminHeaders">
        Products
        <button className='primaryBut' onClick={()=>navigate("/admin/products/create-product")}>Create</button>
        
      </div>
      <Outlet/>
    </>
    
  )
}

/*export const AdminHeaders = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PrimaryButton = styled.button`
  padding: 9px 12px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0.5rem 0;
`; */
