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

        <div>
          {/* Dynamic table */}
          {employees.length === 0 ? (
            <div className="flex justify-center items-center">
              No Employees available to see
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((item, index) => (
                    <tr key={item._id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.status}</td>
                      <td>{item.role}</td>
                      <td>
                        <button onClick={() => handleUpdate(index)}>Update</button>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(index)}>Delete</button>
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
