import React, { useEffect, useState } from 'react'
import { AdNav } from '../components/AdNav';
import { axiosInstance } from '../lib/axios';

const ManageLap = () => {
  const [laptops,setLaptops]=useState(null);
  const getLaptop= async ()=>{
    try{
      const res=await axiosInstance.get("/laptop/get-all-laptop");
      if(res){
        setLaptops(res.data);
      }else{
        console.log("no data available")
      }

    }catch(e){
      console.log("error while getting laptop data")
    }
  }
  // useEffect( ()=>{
  //   getLaptop()
  // },[])
  return (
   <>
        <AdNav/>
        <div className='flex flex-col justify-start items-center'>
            <div >
              <button className='btn btn-accent' onClick={()=>getLaptop()}>Refresh</button>
              <button className='btn btn-accent'>Add Laptop</button>
            </div>
            
         <div>

              {/* dynamic table start..*/}
            <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Purchase Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
          
        <tbody>
          {(!laptops) ? <h4 className='flex justify-center items-center'>No laptops available</h4> : laptops.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? "bg-base-200" : ""}>
              <th>{laptops.lapId}</th>
              <td>{laptops.lap_brand}</td>
              <td>{laptops.lap_model}</td>
              <td>{laptops.lap_serialNumber}</td>
              <td>{laptops.lap_status}</td>
              <td>{laptops.lap_purchaseDate}</td>
              <td>
                  <button id={item.id}>update</button>
              </td>
              <td>
                  <button id={item.id}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
            </div>
        </div>
   </>
  )
}

export default ManageLap;