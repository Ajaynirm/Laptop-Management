import React, { useEffect, useState } from "react";
import { AdNav } from "../components/AdNav";
import { axiosInstance } from "../lib/axios.js";
import { useNavigate } from "react-router-dom";
const AssignLap = () => {
  const [assigned, setAssigned] = useState(null);
  const navigate = useNavigate();
  const fetchAssign = async ()=>{
    try {
      const res=await axiosInstance.get("/assignment/getAllAssignment");
    if(res){
      setAssigned(res.data);
      console.log(res.data);
    }
    } catch (error) {
      console.log(error.message);
    }
  }
  const HandleAssign =()=>{
    navigate("/assign-page")
  }


useEffect(()=>{
  fetchAssign();
},[]);

  return (
    <>
      <AdNav />
     <div className="flex flex-col justify-center items-center p-12 gap-10">
        <div>
          <button className="btn btn-primary bg-green-400 text-black" onClick={()=>HandleAssign()}>Assign</button>
          </div>
        <div className="text-green-500">Assigned Laptop</div>

        {/* dynamic table 1 for Assigned laptop start..*/}
        <div className="overflow-auto max-h-[400px] w-full border border-gray-300 rounded">
          <table className="table-auto w-full text-left">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee ID</th>
                <th>Laptop ID</th>
                <th>Assigned At</th>
                <th>Returned At</th>
                <th>Re-Assign</th>
                <th>Un-Assign</th>
                <th>View Report</th>
              </tr>
            </thead>

            <tbody>
              {!assigned ? (
                <h4 className="flex justify-center items-center">
                  No Assigned laptops available
                </h4>
              ) : (
                assigned.map((item, index) => (
                  <tr
                    key={item.id}
                   
                  >
                    <th>{assigned.lapId}</th>
                    <td>{assigned.lap_brand}</td>
                    <td>{assigned.lap_model}</td>
                    <td>{assigned.lap_serialNumber}</td>
                    <td>{assigned.lap_status}</td>
                    <td>{assigned.lap_purchaseDate}</td>
                    <td>
                      <button id={item.id}>Re-Asign</button>
                    </td>
                    <td>
                      <button id={item.id}>Un-Assign</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* assign table end */}
     

        {/* assign table end */}
      </div>
    </>
  );
};

export default AssignLap;
