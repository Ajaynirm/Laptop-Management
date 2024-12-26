import React,{useState} from 'react'
import EmpNav from '../components/EmpNav';
import { useNavigate } from 'react-router-dom';

const EmployHome = () => {
  const [status,setStatus]=useState("Free");
  const navigate = useNavigate();
  return (
    <>

        <EmpNav />
        {/* overview card */}
        <div className="flex justify-center items-center p-5">
      <div className="card bg-base-100 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Status: {status}</h2>
  
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
      {/* third card */}
      <div className="card card-compact bg-base-100 w-64 shadow-xl">
         
          <div className="card-body">
            <h2 className="card-title">Report an Issue</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary"  onClick={()=>navigate("/report-issue")}>Report</button>
            </div>
          </div>
        </div>
      

      </div>
    </>
  )
}

export default EmployHome