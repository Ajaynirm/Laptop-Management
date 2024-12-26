import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { AdNav } from "../components/AdNav";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/employee-admin-signup", formData);
      if (res) {
        toast.success("Employee added successfully");
      }
    } catch (e) {
      toast.error("Error while adding employee");
    }
  };
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
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                {/* model */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {/* serial Number */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ex.1234567"
                    className="input input-bordered"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                {/* purchaseDate */}
              
                
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Add Employee
                  </button>
                </div>
              </form>
              <div className=" flex justify-center items-center">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/view-emp")}
                >
                  Back to Employee Management
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;

