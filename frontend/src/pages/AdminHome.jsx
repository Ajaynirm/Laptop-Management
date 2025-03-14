import React, { useState,useEffect } from "react";
import { AdNav } from "../components/AdNav";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [totLap,setTotLap]=useState(0);
  const [totAssign,setTotAssign]=useState(0);
  const [totAvail,setTotAvail]=useState(0);
  const [totMainten,setTotMainten]=useState(0);
  const navigate=useNavigate();

  //for updating above values
  // useEffect();

  return (
    <>
      <AdNav />
      {/* overview card */}
      <div className="flex justify-center items-center p-5">
      <div className="card bg-base-100 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Total Laptops: {totLap}</h2>
    <h2 className="card-title">Assigned Laptop: {totAssign}</h2>
    <h2 className="card-title">Available Laptop: {totAvail}</h2>
    <h2 className="card-title">Under Maintenance: {totMainten}</h2>
  </div>
</div>
      </div>
      {/* flex defining */}
      <div className="flex  justify-center items-center flex-wrap gap-16 p-10">

        {/* first card */}
        <div className="card card-compact bg-base-100 w-64 shadow-xl">
          
     
          <div className="card-body">
            <h2 className="card-title">Manage Laptop</h2>
         
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={()=>navigate('/manage')}>Manage</button>
            </div>
          </div>
        </div>

        {/* second card */}
        <div className="card card-compact bg-base-100 w-64 shadow-xl">
          
          <div className="card-body">
            <h2 className="card-title">Assign Laptop</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={()=>navigate('/assign')}>Assign</button>
            </div>
          </div>
        </div>
      {/* third card */}
      <div className="card card-compact bg-base-100 w-64 shadow-xl">
         
          <div className="card-body">
            <h2 className="card-title">Track status</h2>
          
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={()=>navigate('/track')}>Track</button>
            </div>
          </div>
        </div>
        {/* fourth card */}
        <div className="card card-compact bg-base-100 w-64 shadow-xl">
          
          <div className="card-body">
            <h2 className="card-title">View Reports</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={()=>navigate('/view')}>View</button>
            </div>
          </div>
        </div>
         {/* fifth card */}
         <div className="card card-compact bg-base-100 w-64 shadow-xl">
          
          <div className="card-body">
            <h2 className="card-title">view Employees</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={()=>navigate('/view-emp')}>View</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AdminHome;
