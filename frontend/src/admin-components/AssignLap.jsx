import React, { useEffect, useState } from "react";
import { AdNav } from "../components/AdNav";
import { axiosInstance } from "../lib/axios";

const AssignLap = () => {
  const [assigned, setAssigned] = useState(null);
  const [Unassigned, setUnAssigned] = useState(null);
  const fetchAssign = async ()=>{
    try {
      const res=await axiosInstance.get("/maintain/view-all-maintainance");
    if(res){
      setAssigned(res.data);
      console.log(res.data);
    }
    } catch (error) {
      console.log(error.message);
    }
  }

  const fetchUnAssign = async()=>{
    try {
      const res=await axiosInstance.get("/manage/get-assigned");
    if(res){
      setUnAssigned(res.data);
      console.log(res.data);
    }
    } catch (error) {
      console.log(error.message);
    }
  }
useEffect(()=>{
  fetchAssign();
});
  return (
    <>
      <AdNav />
     <div className="flex flex-col justify-center items-center p-12">
        <div className="text-green-500">Assigned Laptop</div>

        {/* dynamic table 1 for Assigned laptop start..*/}
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
                <th>Re-Assign</th>
                <th>Un-Assign</th>
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
                    className={index % 2 === 0 ? "bg-base-200" : ""}
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
      </div> 

      <div className="flex flex-col justify-center items-center gap-8">
        <div className="text-red-600">UnAssigned Laptop</div>
        {/* dynamic table 1 for Assigned laptop start..*/}
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
                <th>Assign</th>
              </tr>
            </thead>

            <tbody>
              {!Unassigned ? (
                <h4 className="flex justify-center items-center">
                  No Unassigned available
                </h4>
              ) : (
                Unassigned.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-base-200" : ""}
                  >
                    <th>{Unassigned.lapId}</th>
                    <td>{Unassigned.lap_brand}</td>
                    <td>{Unassigned.lap_model}</td>
                    <td>{Unassigned.lap_serialNumber}</td>
                    <td>{Unassigned.lap_status}</td>
                    <td>{Unassigned.lap_purchaseDate}</td>
                    <td>
                      <button id={item.id}>update</button>
                    </td>
                    <td>
                      <button id={item.id}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* assign table end */}
      </div>
    </>
  );
};

export default AssignLap;
