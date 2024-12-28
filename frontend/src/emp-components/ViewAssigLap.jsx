import React, { useState } from 'react'
import EmpNav from '../components/EmpNav';

const ViewAssigLap = () => {
  const[assigned,setAssigned]=useState(null);
  return (
    <>
     <EmpNav />

       <div className="flex flex-col justify-center items-center p-12">
        <div className="text-green-500">Assigned Laptop</div>

        {/* dynamic table 1 for Assigned laptop start..*/}
        <div className="overflow-auto sm:overflow-scroll">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Serial Number</th>
                <th>Status</th>
                <th>Purchase Date</th>
                <th>update status</th>
                <th>Report</th>
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
                    <th>{index+1}</th>
                    <th>{assigned.lapId}</th>
                    <td>{assigned.lap_brand}</td>
                    <td>{assigned.lap_model}</td>
                    <td>{assigned.lap_serialNumber}</td>
                    <td>{assigned.lap_status}</td>
                    <td>{assigned.lap_purchaseDate}</td>
                    <td>
                      <button id={item.id}>Update Status</button>
                    </td>
                    <td>
                      <button id={item.id}>Report Status</button>
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
  )
}

export default ViewAssigLap;