import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { AdNav } from "../components/AdNav";
import { useNavigate } from "react-router-dom";

const AddMaintenance = () => {
  const navigate = useNavigate();

  const [laptopIds, setLaptopIds] = useState([]); // Store the list of laptop IDs
  const [formData, setFormData] = useState({
    laptopId: "",
    description: "",
    status: "pending",
    cost: "",
  });

  // Fetch laptop IDs
  useEffect(() => {
    const fetchLaptopIds = async () => {
      try {
        const res = await axiosInstance.get("/laptop/get-all-laptop-id");
        if (res && res.data) {
          setLaptopIds(res.data.laptops);
        }
      } catch (e) {
        toast.error("Failed to fetch laptop IDs");
      }
    };

    fetchLaptopIds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/maintain/add-maintenance", formData);
      if (res) {
        toast.success("Maintenance added successfully");
        navigate("/view"); // Navigate to the maintenance view page
      }
    } catch (e) {
      toast.error("Error while adding maintenance");
    }
  };

  return (
    <>
      <AdNav />
      <div className="flex flex-col justify-center items-center">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
                {/* Laptop ID Dropdown */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Laptop ID</span>
                  </label>
                  <select
                    className="select select-bordered"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, laptopId: e.target.value })
                    }
                  >
                    <option value="">Select a Laptop ID</option>
                    {laptopIds.map((laptop) => (
                      <option key={laptop._id} value={laptop._id}>
                        {laptop._id}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    className="input input-bordered"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/* Status Dropdown */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    className="select select-bordered"
                    required
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Cost */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Cost</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter cost"
                    className="input input-bordered"
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        cost: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Add Maintenance
                  </button>
                </div>
              </form>
              <div className="flex justify-center items-center mt-4">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/view")}
                >
                  Back to Maintenance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMaintenance;
