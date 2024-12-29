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
    toast.promise(
      getLaptop(),
      {
        loading: "fetching  data...",
        success: "Refreshed successfully!",
        error: "Failed to refresh. Please try again.",
      }
    )
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
        <div className="flex flex-col justify-between items-center gap-10 w-full">
  <div className="flex flex-row gap-10 p-5">
    <button className="btn btn-accent" onClick={handleRefresh}>
      Refresh
    </button>
    <button className="btn btn-accent" onClick={() => navigate('/add-lap')}>
      Add Laptop
    </button>
  </div>

  {/* Dynamic table */}
  {!laptops ? (
    <div className="flex justify-center items-center">
      No laptops available
    </div>
  ) : (
    <div
      className="overflow-auto max-h-[400px] w-full border border-gray-300 rounded"
    >
      <table className="table-auto w-full text-left">
        {/* Table Head */}
        <thead>
          <tr>
            <th className="p-2 border-b">S.No</th>
            <th className="p-2 border-b text-center">ID</th>
            <th className="p-2 border-b">Brand</th>
            <th className="p-2 border-b">Model</th>
            <th className="p-2 border-b">Serial Number</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b text-center">Purchase Date</th>
            <th className="p-2 border-b text-center">Update</th>
            <th className="p-2 border-b text-center">Delete</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {laptops.map((item, index) => (
            <tr key={index} >
              <td className="p-2 border-b">{index + 1}</td>
              <td className="p-2 border-b">{item._id}</td>
              <td className="p-2 border-b">{item.brand}</td>
              <td className="p-2 border-b">{item.model}</td>
              <td className="p-2 border-b">{item.serialNumber}</td>
              <td className="p-2 border-b">{item.status}</td>
              <td className="p-2 border-b text-center">{item.purchaseDate}</td>
              <td className="p-2 border-b text-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleUpdate(index)}
                >
                  Update
                </button>
              </td>
              <td className="p-2 border-b text-center">
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

        
   </>
  )
}

export default ManageLap;