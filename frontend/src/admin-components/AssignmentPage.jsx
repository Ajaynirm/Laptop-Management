import React, { useEffect, useState } from "react";
import { AdNav } from "../components/AdNav";
import { axiosInstance } from "../lib/axios.js";
import { useNavigate } from "react-router-dom";
const AssignmentPage = () => {
  const [remainMaintenance, setRemainMaintenance] = useState([]);
  const [idleEmployee,setIdleEmployee]=useState([]);
  const [selectedEmployee,setSelectedEmployee]=useState(null);
  const [selectedLaptop,setSelectedLaptop]=useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    laptopId: "",
    empId: "",
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/laptop/add-laptop", formData);
      if (res) {
        toast.success("Laptop added successfully");
      }
    } catch (e) {
      toast.error("Error while adding laptop");
    }
  };
  const fetchRemainMaintenance = async () => {
    try {
      
      const res = await axiosInstance.get("/maintain/get-not-assigned");
      if (res) {
        setRemainMaintenance(res.data.data);
        console.log(res.data.data)
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchIdleEmployee = async () => {
    try {
      const res = await axiosInstance.get("/manage/get-available-employee");
      if (res) {
        
        setIdleEmployee(res.data.employees);
       
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const HandleAssign = () => {
    navigate("/assign-page");
  };

  useEffect(() => {
    fetchRemainMaintenance();
    fetchIdleEmployee();
  }, []);
  return (
    <>
      <AdNav />
      <div className="flex flex-col justify-center items-center">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            {/* id */}
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
                {/* brand */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Laptop Id</span>
                  </label>

                  <select
                    className="select select-bordered"
                    required
                    onChange={(e) => {
                      const selectedIndex = e.target.selectedIndex - 1; // Adjust for default "Select an Employee ID" option
                      const selectedEmployee = idleEmployee[selectedIndex] || null;
                    
                      setFormData({ ...formData, empId: e.target.value });
                    
                      // Store both employee ID and index
                      setSelectedLaptop(selectedIndex);
                    }}
                    
                  >
                    {remainMaintenance && remainMaintenance.length > 0 ? (
                      <>
                        <option value="">Select a Laptop ID</option>
                        {remainMaintenance.map((laptop) => (
                          <option key={laptop._id} value={laptop.laptopId}>
                            {laptop.laptopId}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option>Not available</option>
                    )}
                  </select>
                </div>
                {/* after selecting laptop id  */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Laptop name</span>
                  </label>
                  <input
                    type="text"
                    placeholder={remainMaintenance[selectedLaptop]}
                    className="input input-bordered"
                    
                  />

                </div>
                {/* model */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Employee Id</span>
                  </label>
                  <select
                    className="select select-bordered"
                    required
                    onChange={(e) =>{
                      setFormData({ ...formData, empId: e.target.value });

                      setIdleEmployee(e.target.value);

                      const selectedIndex = e.target.selectedIndex - 1; // Adjust for default "Select an Employee ID" option
                      const selectedEmployee = idleEmployee[selectedIndex] || null;
                    
                      setFormData({ ...formData, empId: e.target.value });
                    
                      // Store both employee ID and index
                      setIdleEmployee({
                        id: e.target.value,
                        index: selectedIndex,
                      });
                    }}
                  >
                    {idleEmployee && idleEmployee.length > 0 ? (
                      <>
                        <option value="">Select a Employee ID</option>
                        {idleEmployee.map((employee) => (
                          <option key={employee._id} value={employee._id}>
                            {employee._id}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option>No Free Employees </option>
                    )}
                  </select>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Assign Laptop
                  </button>
                </div>
              </form>
              <div className=" flex justify-center items-center">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/assign")}
                >
                  Back to Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentPage;
