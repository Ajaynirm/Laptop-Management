import React, { useEffect, useState } from 'react'
import { AdNav } from '../components/AdNav';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth } from '../lib/auth.js';

const ManageLap = () => {
  const navigate=useNavigate();
  const {setLaptopData} = auth();

  const [laptops,setLaptops]=useState(null);
  const handleRefresh = async ()=> {
    console.log("refresh clicked")
    try{
      const res = await getLaptop();
      if(res){
        toast.success("Refreshed Successfully,...")
      }
    }catch(e){
      console.log("error")
        toast.error("Failed to refresh");
    }
  }
  const handleUpdate = (index)=> {
     console.log(index)
     const laptop = laptops[index]
     console.log(laptop);
      setLaptopData(laptop);
      navigate('/update-laptop')
  }
  const handleDelete = (index) => {
    const laptop = laptops[index]
    setLaptopData(laptop);
    navigate('/delete-laptop')
  }
  const getLaptop= async ()=>{
    try{
      const res=await axiosInstance.get("/laptop/get-all-laptop");
      if(res){
        setLaptops(res.data);
      }else{
        console.log("no data available")
        throw new Error("No data available")
      }

    }catch(e){
      console.log("error while getting laptop data")
      throw e;
    }
  }
  useEffect( ()=>{
    getLaptop()
  },[])
  return (
   <>
        <AdNav/>
        <div className='flex flex-col justify-between items-center gap-10 w-100px'>
            <div  className='flex flex-row gap-10 p-20px'>
              <button className='btn btn-accent ' onClick={()=>handleRefresh()}>Refresh</button>
              <button className='btn btn-accent' onClick={()=> navigate('/add-lap')}>Add Laptop</button>
            </div>
            
         <div>

              {/* dynamic table start..*/}
              {!laptops ? (
  <div className="flex justify-center items-center">No laptops available</div>
) : (
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
        {laptops.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-base-200" : ""}>
            <th>{item._id}</th>
            <td>{item.brand}</td>
            <td>{item.model}</td>
            <td>{item.serialNumber}</td>
            <td>{item.status}</td>
            <td>{item.purchaseDate}</td>
            <td>
              <button onClick={()=>handleUpdate(index)}>Update</button>
            </td>
            <td>
              <button onClick={()=>handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
            </div>
        
   </>
  )
}

export default ManageLap;