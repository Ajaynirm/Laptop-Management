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
        <div className='flex flex-col justify-center items-center h-100px gap-16 w-600px' >
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold p-10">Laptop Management ...</h1>
      <p className="py-6">
        Login As
      </p>
      <div className='flex justify-around items-center gap-10'>
          
            <button className="btn btn-primary" onClick={()=>navigate('/admin-login')}>Admin</button>
            <button className="btn btn-accent" onClick={()=>navigate('/employee-login')}>Employee</button>
            </div>
    </div>
  </div>
</div>
            
        </div>
   </>
  )
}

export default BootPage



