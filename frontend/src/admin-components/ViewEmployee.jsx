import React, { useEffect, useState } from 'react';
import { AdNav } from '../components/AdNav';
import { axiosInstance } from '../lib/axios.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth } from '../lib/auth.js';

const ViewEmployee = () => {
  const navigate = useNavigate();
  const { setEmployeeData } = auth();

  const [employees, setEmployees] = useState([]); // Initialize as an empty array

  const handleRefresh = async () => {
    console.log('Refresh clicked');
    try {
      await getEmployee(); // Re-fetch employees
      toast.success('Refreshed Successfully');
    } catch (e) {
      console.log('Error during refresh');
      toast.error('Failed to refresh');
    }
  };

  const handleUpdate = (index) => {
    const employee = employees[index];
    setEmployeeData(employee);
    navigate('/update-employee');
  };

  const handleDelete = (index) => {
    const employee = employees[index];
    setEmployeeData(employee);
    navigate('/delete-employee');
  };

  const getEmployee = async () => {
    try {
      console.log('Fetching employees...');
      const res = await axiosInstance.get('/manage/get-emp');
      if (res && res.data && res.data.employees) {
        console.log('Employees fetched successfully:', res.data.employees);
        setEmployees(res.data.employees); // Extract the employees array
      } else {
        console.log('No employees available');
        toast.error('No employees available');
      }
    } catch (e) {
      console.log('Error while getting employee data:', e);
      toast.error('Failed to fetch employee data');
    }
  };

  useEffect(() => {
    console.log('ViewEmployee mounted');
    getEmployee(); // Fetch employees on mount
  }, []);

  return (
    <>
      <AdNav />
      <div className="flex flex-col justify-between items-center gap-10 w-full">
  <div className="flex flex-row gap-10 p-5">
    <button className="btn btn-accent" onClick={handleRefresh}>
      Refresh
    </button>
    <button className="btn btn-accent" onClick={() => navigate('/add-emp')}>
      Add Employee
    </button>
  </div>

  <div className="w-full">
    {/* Dynamic table */}
    {!employees ? (
      <div className="flex justify-center items-center h-40">
        No Employees available to see
      </div>
    ) : (
      <div className="overflow-auto  w-full border border-gray-300 rounded">
        <table className="table-auto w-full text-left">
          <thead>
            <tr >
              <th className="p-2 border-b">S.No</th>
              <th className="p-2 border-b text-center">ID</th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b text-center">Email</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Role</th>
              <th className="p-2 border-b text-center">Update</th>
              <th className="p-2 border-b text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((item, index) => (
              <tr key={item._id} >
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b text-center">{item._id}</td>
                <td className="p-2 border-b">{item.name}</td>
                <td className="p-2 border-b text-center">{item.email}</td>
                <td className="p-2 border-b">{item.status}</td>
                <td className="p-2 border-b">{item.role}</td>
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
</div>

    </>
  );
};

export default ViewEmployee;
