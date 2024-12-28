import React,{useState} from 'react'
import EmpNav from '../components/EmpNav';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/auth.js';

const EmployHome = () => {
  const {AuthEmployee} = auth();
  const [status,setStatus]=useState("Available");
  const navigate = useNavigate();
  return (
    <>

        <EmpNav />
        {/* overview card */}
        <div className="flex justify-center items-center p-5">
      <div className="card bg-base-100 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title"> 
      <span className='text-green-500'>Status:</span> 
      <span>{AuthEmployee.status.toUpperCase()}</span>
    </h2>
  
  </div>
</div>
      </div>
      {/* flex defining */}
      <div className="flex  justify-center items-center flex-wrap gap-16 p-10">

        {/* first card */}
        <div className="card card-compact bg-base-100 w-64 shadow-xl">
        
          <div className="card-body">
            <h2 className="card-title">View Assigned Laptop</h2>
            
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={()=>navigate("/my-assign")}>view</button> 
            </div>
          </div>
        </div>

        {/* second card */}
        <div className="card card-compact bg-base-100 w-64 shadow-xl">
         
          <div className="card-body">
            <h2 className="card-title">Request New Laptop</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={()=>navigate("/request-laptop")}>Request</button>
            </div>
          </div>
        </div>
   
      

      </div>
    </>
  )
}

export default EmployHome