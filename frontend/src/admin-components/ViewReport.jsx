import React, { useEffect, useState } from 'react';
import { AdNav } from '../components/AdNav';
import { axiosInstance } from '../lib/axios.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ViewReport = () => {
  const navigate = useNavigate();

  const [maintenances, setMaintenances] = useState([]); 

  // Re-fetch employees
  const handleRefresh = async () => {
    try {
      await getMaintenance(); 
      toast.success('Refreshed Successfully');
    } catch (e) {
      console.log('Error during refresh');
      toast.error('Failed to refresh');
    }
  };

  const getMaintenance = async () => {
    try {
      const res = await axiosInstance.get('/maintain/view-all-maintenance');
      if (res && res.data) {
        setMaintenances(res.data);
      } else {
        toast.error('No Maintenance available');
      }
    } catch (e) {
      console.log('Error while getting Maintenance data:', e);
      toast.error('Failed to fetch Maintenancedata');
    }
  };

  useEffect(() => {
    getMaintenance(); 
  }, []);

  return (
    <>
      <AdNav />
      <div className="flex flex-col justify-between items-center gap-10 w-full">
        <div className="flex flex-row gap-10 p-5">
          <button className="btn btn-accent" onClick={()=>handleRefresh()}>
            Refresh
          </button>
          <button className="btn btn-accent" onClick={() => navigate('/add-maintain')}>
            Add Maintenance
          </button>
        </div>

        <div>
          {/* Dynamic table */}
          {maintenances.length === 0 ? (
            <div className="flex justify-center items-center">
              No Maintenance available to see
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Laptop Id</th>
                    <th>description</th>
                    <th>status</th>
                    <th>cost</th>
                    <th>loggedAt</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenances.map((item, index) => (
                    <tr key={item._id} className={index % 2 === 0 ? 'bg-base-200' : ''}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.status}</td>
                      <td>{item.role}</td>
                      <td>
                        <button >Update</button>
                      </td>
                      <td>
                        <button >Delete</button>
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

export default ViewReport;


