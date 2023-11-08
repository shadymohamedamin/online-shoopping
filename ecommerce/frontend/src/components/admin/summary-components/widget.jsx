import React from 'react'
import styled from 'styled-components'
export default function Widget({data}) {
    //{data.percentage<0?<><Persent isPositive={false}>{Math.floor(data.percentage) + "%"}</Persent></>:<><Persent isPositive={true}></Persent></>}
  return (
    <styledWidget>
        <Icon color={data.color} bgcolor={data.bgColor}>{data.icon}</Icon>
        <Text>
            <h3>{data.isMoney?"$"+data.digits.toLocaleString():data.digits.toLocaleString()}</h3>
            <p>{data.title}</p>
        </Text>
        {data.percentage>0?<Persent isPositive={true}>{Math.floor(data.percentage)+"%"}</Persent>:<Persent isPositive={false}>{Math.floor(data.percentage)+"%"}</Persent>}
        
    
    </styledWidget>
  )
}


const styledWidget=styled.div`
    display:flex;
    align-items:center;
`;


const Icon=styled.div`
    margin-right:0.5rem;
    padding:0.5rem;
    color:${({color})=>color};
    background:${({bgcolor})=>bgcolor};
    border-radius:3px;
    font-size:20px;
`;

const Text=styled.div`
h3{
    font-weight:900;
}
p{
    font-size:14px;
    color:rgba(234,234,255,0.68);
}
`;

const Persent=styled.div`
margin-left:0.5rem;
font-size:14px;
color:${({isPositive})=>isPositive?"rgb(114,225,40)":"rgb(255,77,73)"};
`;

