import React from 'react'
import { useNavigate } from 'react-router-dom';
const BootPage = () => {
  const navigate = useNavigate();
    const admin=()=> {
      navigate('/admin-login');
    }
    const employee=()=>{
      navigate('/employee-login');
    }
  return (
   <>
        <div className='flex flex-col justify-center items-center h-64 gap-16 w-600px' >
            <h1>Laptop Management</h1>
            <div>Login as</div>
            <div className='flex justify-between items-center'>
          
            <button className="btn btn-primary" onClick={()=>navigate('/admin-login')}>Admin</button>
            <button className="btn btn-accent" onClick={()=>navigate('/employee-login')}>Employee</button>
            </div>
            
        </div>
   </>
  )
}

export default BootPage



