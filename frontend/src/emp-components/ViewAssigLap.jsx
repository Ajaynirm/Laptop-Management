import React, { useEffect, useState } from 'react'
import EmpNav from '../components/EmpNav';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/auth.js';

const ViewAssigLap = () => {
  const navigate = useNavigate();
  const {AuthEmployee} = auth();

  const[assigned,setAssigned]=useState(null);
  const getAssignment = async()=>{
    try {
      const assignments = await axiosInstance.post("/assignment/getAssignment",AuthEmployee._id);
      if(assignments.data.assignments){
        console.log(assignments.data.assignments)
        setAssigned(assignments.data.assignments);
        toast.success("Assignment fetched");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const handleReport = ()=>{

  }

  const handleRefresh = async ()=>{
      await getAssignment();
      toast.success("Assignment Refreshed");
  }


  useEffect(()=> {
    getAssignment();
  },[]);
  return (
    <>
     <EmpNav />

     <div className="flex flex-col justify-between items-center gap-10 w-full">
  <div className="flex flex-row gap-10 p-5">
    <button className="btn btn-accent" onClick={handleRefresh}>
      Refresh
    </button>

  </div>

  {/* Dynamic table */}
  {!assigned ? (
    <div className="flex justify-center items-center">
      No Assignment available for you
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
            <th className="p-2 border-b text-center">Assignment ID</th>
            <th className="p-2 border-b">Laptop Id</th>
            <th className="p-2 border-b">Assigned At</th>
            <th className="p-2 border-b">Returned at</th>
            <th className="p-2 border-b">Report</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {assigned.length!=0 && assigned.map((item, index) => (
            <tr key={index} >
              <td className="p-2 border-b">{index + 1}</td>
              <td className="p-2 border-b">{item._id}</td>
              <td className="p-2 border-b">{item.laptopId}</td>
              <td className="p-2 border-b">{item.assignedAt}</td>
              <td className="p-2 border-b">{item.returnedAt}</td>
              <td className="p-2 border-b text-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleReport(index)}
                >
                  Report
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

export default ViewAssigLap;