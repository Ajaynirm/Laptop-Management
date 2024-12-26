import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/auth.js";
export const AdNav = () => {
  const {logout} = auth();
  const navigate=useNavigate();
  const handleLogout = async ()=>{
    try {
      const res=await logout(); 
      if (res.status === 200) {
        navigate("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.log(error);
    }
   

     
  }

  return (
    <>
      <div>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <button onClick={()=>navigate("/admin")}>Homepage</button>
                </li>
                <li>
                  <button onClick={()=>navigate("/manage")}>manage </button>
                </li>
                <li>
                  <button onClick={()=>navigate("/assign")}>Assign Laptop</button>
                </li>
                <li>
                  <button onClick={()=>navigate("/track")}>Track status</button>
                </li>
                <li>
                  <button onClick={()=>navigate("/view")}>view Report</button>
                </li>
                <li>
                  <button onClick={()=>navigate("/view-emp")}>view Employees</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl">Laptop Management</a>
          </div>
          <div className="navbar-end">
            <label className="grid cursor-pointer place-items-center">
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
              />
              <svg
                className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>
          <div className="navbar-end">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>

            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="bg-neutral text-neutral-content w-24 rounded-full">
                  <span className="text-3xl">A</span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between" >
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a >Settings</a>
                </li>
                <li>
                  {/* when the logout button clicked it go to backend and delete or reset the jwt token and sent to Login page */}
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
